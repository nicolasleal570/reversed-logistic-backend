const boom = require('@hapi/boom');
const { availablesStates } = require('../db/models/case.model');
const { sequelize } = require('../db/sequelize');
const CasesService = require('./cases.service');
const UserService = require('./users.service');

const caseService = new CasesService();

const { CleanProcessOrder, CustomerLocation } = sequelize.models;

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
        'createdBy',
        'steps',
        'case',
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
      include: ['createdBy', 'steps'],
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
}

module.exports = CleanProcessOrdersService;
