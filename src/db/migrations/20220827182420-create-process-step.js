'use strict';
const {
  ProcessStepSchema,
  PROCESS_STEP_TABLE,
} = require('../models/process-step.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PROCESS_STEP_TABLE, ProcessStepSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(PROCESS_STEP_TABLE);
  },
};
