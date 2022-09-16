const boom = require('@hapi/boom');
const { availablesStates } = require('../db/models/case.model');
const { sequelize } = require('../db/sequelize');

const { Case, Order, OrderItem } = sequelize.models;

class CasesService {
  constructor() {}

  async create(data) {
    const newCase = await Case.create(data);
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

  async findCasesByCustomer(customerLocationId) {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items',
          where: { wasReturned: false },
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
}

module.exports = CasesService;
