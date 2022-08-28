'use strict';
const {
  CaseCleanProcessStepSchema,
  CASE_CLEAN_PROCESS_STEP_TABLE,
} = require('../models/case-clean-process-step.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      CASE_CLEAN_PROCESS_STEP_TABLE,
      CaseCleanProcessStepSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CASE_CLEAN_PROCESS_STEP_TABLE);
  },
};
