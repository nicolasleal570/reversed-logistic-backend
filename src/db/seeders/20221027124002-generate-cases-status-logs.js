'use strict';
const { CASES_STATUS_LOGS_TABLE } = require('../models/case-status-log');

module.exports = {
  async up(queryInterface) {
    const arr = new Array(20).fill(null);

    await queryInterface.bulkInsert(
      CASES_STATUS_LOGS_TABLE,
      arr.map((_, idx) => {
        return {
          status: 'AVAILABLE',
          case_id: idx,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CASES_STATUS_LOGS_TABLE, null, {});
  },
};
