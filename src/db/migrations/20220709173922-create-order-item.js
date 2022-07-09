'use strict';
const { OrderItemSchema, ORDER_ITEM_TABLE } = require('../models/order-item.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_ITEM_TABLE, OrderItemSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_ITEM_TABLE);
  },
};
