'use strict';
const {
  InventoryTurnoverAnalyticSchema,
  INVENTORY_TURNOVER_ANALYTICS_TABLE,
} = require('../models/inventory-turnover-analytic.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      INVENTORY_TURNOVER_ANALYTICS_TABLE,
      InventoryTurnoverAnalyticSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(INVENTORY_TURNOVER_ANALYTICS_TABLE);
  },
};
