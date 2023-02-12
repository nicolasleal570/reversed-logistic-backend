'use strict';
const dayjs = require('dayjs');
const { CASE_TABLE, availablesStates } = require('../models/case.model');

module.exports = {
  async up(queryInterface) {
    const arr = new Array(8).fill(null);

    await queryInterface.bulkInsert(
      CASE_TABLE,
      arr.map((_, idx) => {
        const date = dayjs().subtract(1, 'day').toDate();

        return {
          name: `Case #00${idx + 1}`,
          description: '',
          volume: 50,
          weight: 50,
          state: availablesStates.AVAILABLE,
          created_at: date,
          updated_at: date,
        };
      }),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CASE_TABLE, null, {});
  },
};
