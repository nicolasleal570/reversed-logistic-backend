'use strict';
const {
  CaseCleanProcessStep,
  CASE_CLEAN_PROCESS_STEP_TABLE,
} = require('../models/case-clean-process-step');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      CASE_CLEAN_PROCESS_STEP_TABLE,
      CaseCleanProcessStep
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CASE_CLEAN_PROCESS_STEP_TABLE);
  },
};
