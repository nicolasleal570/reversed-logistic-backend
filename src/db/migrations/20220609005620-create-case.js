'use strict';
const { CaseSchema, CASE_TABLE } = require('../models/case.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CASE_TABLE, CaseSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CASE_TABLE);
  },
};
