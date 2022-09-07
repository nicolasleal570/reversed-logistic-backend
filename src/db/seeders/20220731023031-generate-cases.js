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
          volume: faker.datatype.number({ min: 5, max: 50 }),
          weight: faker.datatype.number({ min: 5, max: 50 }),
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
