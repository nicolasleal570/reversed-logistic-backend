'use strict';
const { CaseProcessStepSchema, CASE_PROCESS_STEP_TABLE } = require('../models/case-process-step.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CASE_PROCESS_STEP_TABLE, CaseProcessStepSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CASE_PROCESS_STEP_TABLE);
  },
};
