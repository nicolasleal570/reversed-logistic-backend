'use strict';
const {
  OutOfStockItemSchema,
  OUT_OF_STOCK_ITEM_TABLE,
} = require('../models/out-of-stock-item.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      OUT_OF_STOCK_ITEM_TABLE,
      OutOfStockItemSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(OUT_OF_STOCK_ITEM_TABLE);
  },
};
