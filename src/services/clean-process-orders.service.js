const boom = require('@hapi/boom');
const { availablesStates } = require('../db/models/case.model');
const { sequelize } = require('../db/sequelize');
const CasesService = require('./cases.service');
const UserService = require('./users.service');

const caseService = new CasesService();

const {
  CleanProcessOrder,
  CustomerLocation,
  CaseCleanProcessStep,
  OutOfStockItem,
  Case,
} = sequelize.models;

class CleanProcessOrdersService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newCleanProcessOrder = await CleanProcessOrder.create(data);

    await caseService.update(data.caseId, {
      state: availablesStates.IN_CLEAN_PROCESS,
    });

    return newCleanProcessOrder.toJSON();
  }

  async findAll() {
    const cleanProcessOrders = await CleanProcessOrder.findAll({
      include: [
        'status',
        'createdBy',
        'steps',
        {
          model: Case,
          as: 'case',
          paranoid: false,
        },
        'caseContent',
        {
          model: CustomerLocation,
          as: 'customerLocation',
          include: ['customer'],
        },
      ],
    });
    return cleanProcessOrders;
  }

  async findOne(id) {
    const cleanProcessOrder = await CleanProcessOrder.findByPk(id, {
      include: [
        'status',
        'createdBy',
        {
          model: CaseCleanProcessStep,
          as: 'steps',
          include: ['processStep'],
        },
        'case',
        'caseContent',
        {
          model: CustomerLocation,
          as: 'customerLocation',
          include: ['customer'],
        },
      ],
    });

    if (!cleanProcessOrder) {
      throw boom.notFound('Clean process order not found');
    }

    return cleanProcessOrder;
  }

  async update(id, changes) {
    const cleanProcessOrder = await this.findOne(id);
    const res = await cleanProcessOrder.update(changes);

    return res;
  }

  async delete(id) {
    const cleanProcessOrder = await this.findOne(id);
    await cleanProcessOrder.destroy();

    return cleanProcessOrder;
  }

  async startCleanProcess(id) {
    const cleanProcessOrder = await this.findOne(id);

    cleanProcessOrder.update({ startedAt: new Date(), statusId: 2 });

    await CaseCleanProcessStep.update(
      {
        isCurrent: true,
      },
      {
        where: {
          id: cleanProcessOrder.steps.find((item) => item.order === 1).id,
        },
      }
    );

    return this.findOne(id);
  }

  async setStepDone(id, data) {
    const cleanProcessOrder = await this.findOne(id);
    const { stepId } = data;

    let currentCaseCleanProcessStep = await CaseCleanProcessStep.findByPk(
      stepId
    );

    await currentCaseCleanProcessStep.update({
      isCurrent: false,
      isDone: true,
    });

    currentCaseCleanProcessStep = currentCaseCleanProcessStep.toJSON();

    const nextStep = cleanProcessOrder.steps.find((item) => {
      return item.order === currentCaseCleanProcessStep.order + 1;
    });

    if (nextStep) {
      await CaseCleanProcessStep.update(
        {
          isCurrent: true,
        },
        {
          where: {
            id: nextStep.id,
          },
        }
      );
    }

    return this.findOne(id);
  }

  async markAsDone(id) {
    const cleanProcessOrder = await this.findOne(id);

    await cleanProcessOrder.update({ finishedAt: new Date(), statusId: 3 });

    await caseService.update(cleanProcessOrder.caseId, {
      state: availablesStates.CLEAN_PROCESS_DONE,
    });

    let outOfStockItem = await OutOfStockItem.findOne({
      where: {
        caseId: cleanProcessOrder.caseId,
        finished: false,
      },
    });

    if (outOfStockItem) {
      outOfStockItem.update({
        cleanProcessDone: true,
        finished: true,
      });
    }

    return this.findOne(id);
  }
}

module.exports = CleanProcessOrdersService;
