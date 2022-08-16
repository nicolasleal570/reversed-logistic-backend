'use strict';
const { faker } = require('@faker-js/faker');
const { CASE_TABLE, availablesStates } = require('../models/case.model');

module.exports = {
  async up(queryInterface) {
    const arr = new Array(20).fill(null);
    await queryInterface.bulkInsert(
      CASE_TABLE,
      arr.map(() => {
        return {
          name: `Case #${faker.datatype.number({ min: 100, max: 500 })}`,
          description: '',
          volume: 0,
          weight: 0,
          state: availablesStates[0],
          created_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CASE_TABLE, null, {});
  },
};
