'use strict';
const {
  CleanProcessStatusSchema,
  CLEAN_PROCESS_STATUS_TABLE,
} = require('../models/clean-process-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      CLEAN_PROCESS_STATUS_TABLE,
      CleanProcessStatusSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CLEAN_PROCESS_STATUS_TABLE);
  },
};
