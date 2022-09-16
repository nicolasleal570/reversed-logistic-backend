'use strict';
const {
  OutOfStockStatusSchema,
  OUT_OF_STOCK_STATUS_TABLE,
} = require('../models/out-of-stock-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      OUT_OF_STOCK_STATUS_TABLE,
      OutOfStockStatusSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(OUT_OF_STOCK_STATUS_TABLE);
  },
};
