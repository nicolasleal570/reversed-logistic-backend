'use strict';
const {
  CasesStatusLogsSchema,
  CASES_STATUS_LOGS_TABLE,
} = require('../models/case-status-log');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      CASES_STATUS_LOGS_TABLE,
      CasesStatusLogsSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CASES_STATUS_LOGS_TABLE);
  },
};
