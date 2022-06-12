'use strict';
const { CaseContentSchema, CASE_CONTENT_TABLE } = require('../models/case-content.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CASE_CONTENT_TABLE, CaseContentSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CASE_CONTENT_TABLE);
  },
};
