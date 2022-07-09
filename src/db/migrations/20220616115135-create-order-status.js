'use strict';
const {
  OrderStatusSchema,
  ORDER_STATUS_TABLE,
} = require('../models/order-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_STATUS_TABLE, OrderStatusSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_STATUS_TABLE);
  },
};
