const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { availablesStates } = require('../db/models/case.model');
const { sequelize } = require('../db/sequelize');

const {
  Case,
  Order,
  OrderItem,
  OutOfStockItem,
  OutOfStockOrder,
  CustomerLocation,
} = sequelize.models;

class CasesService {
  constructor() {}

  async create(data) {
    const newCase = await Case.create({
      ...data,
      state: data?.state ?? 'AVAILABLE',
    });
    return newCase.toJSON();
  }

  async findAll(filterParams = {}) {
    let where = {};

    if (filterParams.state === 'DELETED') {
      where = {
        ...where,
        deletedAt: {
          [Op.not]: null,
        },
      };
    }

    if (availablesStates[filterParams?.state ?? '']) {
      where = { ...where, state: availablesStates[filterParams?.state ?? ''] };
    }

    let cases = await Case.findAll({
      where,
      include: [
        {
          model: OutOfStockItem,
          as: 'outOfStockItems',
        },
      ],
      order: [['id', 'ASC']],
      paranoid: filterParams?.state !== 'DELETED',
    });

    cases = cases.map((item) => {
      const { outOfStockItems, ...rest } = item.toJSON();
      const currentOutOfStock = outOfStockItems.find(
        (elem) =>
          elem.wasReturned === false &&
          elem.atWarehouse === false &&
          elem.needsCleanProcess === false &&
          elem.cleanProcessDone === false &&
          elem.finished === false
      );

      return {
        ...rest,
        currentOutOfStockOrderId: currentOutOfStock?.outOfStockOrderId || null,
      };
    });

    return cases;
  }

  async findOne(id, { paranoid } = {}) {
    const paranoidValue =
      typeof paranoid === 'string' ? paranoid === 'true' : paranoid;

    console.log({ paranoidValue });

    const caseItem = await Case.findByPk(id, {
      include: [
        {
          model: Order,
          as: 'orders',
          include: ['createdBy', 'assignedTo', 'orderStatus'],
        },
        {
          model: OutOfStockItem,
          as: 'outOfStockItems',
        },
      ],
      paranoid: paranoidValue,
    });

    if (!caseItem) {
      throw boom.notFound('Case not found');
    }

    const { outOfStockItems, ...rest } = caseItem.toJSON();
    const currentOutOfStock = outOfStockItems.find(
      (elem) =>
        elem.wasReturned === false &&
        elem.atWarehouse === false &&
        elem.needsCleanProcess === false &&
        elem.cleanProcessDone === false &&
        elem.finished === false
    );

    return {
      modelInstance: caseItem,
      jsonData: {
        ...rest,
        currentOutOfStockOrderId: currentOutOfStock?.outOfStockOrderId || null,
      },
    };
  }

  // Show cases which have been using by customer
  async findCasesByCustomer(customerLocationId) {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Case,
              as: 'case',
              where: { state: 'SHIPMENT_DONE' },
              attributes: ['id', 'name'],
              paranoid: false,
            },
          ],
        },
      ],
      where: {
        customerLocationId,
      },
    });

    const cases = [];
    orders.forEach((order) => {
      cases.push(
        ...order.items.map((orderItem) => ({
          ...orderItem.case.toJSON(),
          caseContentId: orderItem.caseContentId,
          orderId: orderItem.orderId,
        }))
      );
    });

    return { customerLocationId, orders, cases };
  }

  // Show cases which have been waiting for clean process
  async findCasesWaitingCleanProcess() {
    const orders = await OutOfStockOrder.findAll({
      include: [
        {
          model: OutOfStockItem,
          as: 'items',
          include: [
            {
              model: Case,
              as: 'case',
              where: { state: 'CLEAN_PROCESS_QUEUED' },
              paranoid: false,
            },
          ],
        },
      ],
    });

    const cases = [];
    orders.forEach((order) => {
      cases.push(
        ...order.items.map((orderItem) => ({
          ...orderItem.case.toJSON(),
          caseContentId: orderItem.caseContentId,
          orderId: orderItem.orderId,
        }))
      );
    });

    return { orders, cases };
  }

  async findCaseLastOutOfStockInfo(caseId) {
    const list = await OutOfStockItem.findOne({
      include: [
        {
          model: Case,
          as: 'case',
          where: {
            state: {
              [Op.or]: ['PICKUP_DONE', 'CLEAN_PROCESS_QUEUED'],
            },
          },
          paranoid: false,
        },
        'caseContent',
        {
          model: Order,
          as: 'order',
          include: [
            {
              model: CustomerLocation,
              as: 'customerLocation',
              include: 'customer',
            },
          ],
        },
      ],
      where: { caseId, finished: false },
    });

    if (!list) {
      throw boom.notFound('No se encontraron resultados');
    }

    return list;
  }

  async update(id, changes) {
    const { modelInstance } = await this.findOne(id);
    await modelInstance.update(changes);

    return this.findOne(id);
  }

  async delete(id) {
    const { modelInstance, jsonData: caseInfo } = await this.findOne(id, {
      paranoid: false,
    });

    if (caseInfo.state !== 'AVAILABLE') {
      throw boom.badRequest('Este case está en uso y no puede ser eliminado.');
    }

    await modelInstance.destroy();

    return this.findOne(id, {
      paranoid: false,
    });
  }

  async handleCaseStateAfterPickupDone(id, data) {
    const { outOfStockItemId, currentStatus } = data;
    const { modelInstance: caseItem } = await this.findOne(id);
    const outOfStockItem = await OutOfStockItem.findByPk(outOfStockItemId, {
      include: [
        {
          model: Case,
          as: 'case',
          attributes: ['id'],
          paranoid: false,
        },
      ],
    });

    if (!outOfStockItem) {
      throw boom.notFound('No se encontró este out of stock order item');
    }

    if (caseItem.id !== outOfStockItem.case.id) {
      throw boom.badRequest('Este case no pertenece a esta orden de recogida');
    }

    if (caseItem.state !== availablesStates.PICKUP_DONE) {
      throw boom.badRequest('Este case no se encuentra en el estado correcto');
    }

    // Update case state, if needs clean set CLEAN_PROCESS_QUEUED. If not, set AVAILABLE
    if (currentStatus === 'SET_AVAILABLE') {
      await caseItem.update({ state: availablesStates.AVAILABLE });
      await outOfStockItem.update({
        finished: true,
      });
    }

    if (currentStatus === 'SET_DIRTY') {
      await caseItem.update({ state: availablesStates.CLEAN_PROCESS_QUEUED });
      await outOfStockItem.update({
        needsCleanProcess: true,
      });
    }

    const updatedCase = await this.findOne(id);

    return {
      case: updatedCase.jsonData,
      outOfStockItem,
    };
  }

  async recover(id) {
    const { modelInstance, jsonData: caseInfo } = await this.findOne(id, {
      paranoid: false,
    });

    if (!caseInfo.deletedAt) {
      throw boom.badRequest('Este case ya fue habilitado.');
    }

    await modelInstance.restore();

    return this.findOne(id);
  }
}

module.exports = CasesService;
