//const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const { Case, Order, OrderStatus } = sequelize.models;

class AnalyticsService {
  constructor() {}

  async caseMostUsed() {
    let cases = await Case.findAll({
      include: [
        {
          model: Order,
          as: 'orders',
          include: [
            {
              model: OrderStatus,
              as: 'orderStatus',
              where: {
                value: 'SHIPMENT_DONE',
              },
            },
          ],
        },
      ],
    });

    cases = [...cases.sort((a, b) => b.orders.length - a.orders.length)]
      .slice(0, 5)
      .filter(({ orders }) => orders.length > 0);

    return cases;
  }
}

module.exports = AnalyticsService;
