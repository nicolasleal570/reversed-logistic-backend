'use strict';
const {
  OutOfStockOrderSchema,
  OUT_OF_STOCK_ORDER_TABLE,
} = require('../models/out-of-stock-order.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      OUT_OF_STOCK_ORDER_TABLE,
      OutOfStockOrderSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(OUT_OF_STOCK_ORDER_TABLE);
  },
};
