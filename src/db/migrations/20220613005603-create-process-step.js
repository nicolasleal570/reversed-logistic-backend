'use strict';
const { CaseProcessSchema, CASE_PROCESS_TABLE } = require('../models/case-process.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CASE_PROCESS_TABLE, CaseProcessSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CASE_PROCESS_TABLE);
  },
};
