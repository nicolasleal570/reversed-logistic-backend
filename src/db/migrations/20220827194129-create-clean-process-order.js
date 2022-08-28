'use strict';
const {
  CleanProcessOrderSchema,
  CLEAN_PROCESS_ORDER_TABLE,
} = require('../models/clean-process-order.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CLEAN_PROCESS_ORDER_TABLE, CleanProcessOrderSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CLEAN_PROCESS_ORDER_TABLE);
  },
};
