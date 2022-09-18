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

    if (availablesStates[filterParams?.state ?? '']) {
      where = { ...where, state: availablesStates[filterParams?.state ?? ''] };
    }

    const cases = await Case.findAll({
      where,
      order: [['id', 'ASC']],
    });
    return cases;
  }

  async findOne(id) {
    const caseItem = await Case.findByPk(id);

    if (!caseItem) {
      throw boom.notFound('Case not found');
    }

    return caseItem;
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
              where: { state: 'WAITING_CLEAN_PROCESS' },
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
              [Op.or]: ['PICKUP_DONE', 'WAITING_CLEAN_PROCESS'],
            },
          },
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
    const caseItem = await this.findOne(id);
    const res = await caseItem.update(changes);

    return res;
  }

  async delete(id) {
    const caseItem = await this.findOne(id);
    await caseItem.destroy();

    return caseItem;
  }

  async handleCaseStateAfterPickupDone(id, data) {
    const { outOfStockItemId, currentStatus } = data;
    const caseItem = await this.findOne(id);
    const outOfStockItem = await OutOfStockItem.findByPk(outOfStockItemId, {
      include: [
        {
          model: Case,
          as: 'case',
          attributes: ['id'],
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

    // Update case state, if needs clean set WAITING_CLEAN_PROCESS. If not, set AVAILABLE
    if (currentStatus === 'SET_AVAILABLE') {
      await caseItem.update({ state: availablesStates.AVAILABLE });
      await outOfStockItem.update({
        finished: true,
      });
    }

    if (currentStatus === 'SET_DIRTY') {
      await caseItem.update({ state: availablesStates.WAITING_CLEAN_PROCESS });
      await outOfStockItem.update({
        needsCleanProcess: true,
      });
    }

    // Update Order item and set finished

    return {
      case: caseItem,
      outOfStockItem,
    };
  }
}

module.exports = CasesService;
