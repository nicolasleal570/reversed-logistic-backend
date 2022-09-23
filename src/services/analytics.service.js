//const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const { Case } = sequelize.models;

class AnalyticsService {
  constructor() {}

  async mostUsed() {
    let cases = await Case.findAll({
      include: ['orders'],
    });

    cases = [...cases.sort((a, b) => b.orders.length - a.orders.length)]
      .slice(0, 5)
      .filter(({ orders }) => orders.length > 0);

    return cases;
  }
}

module.exports = AnalyticsService;
