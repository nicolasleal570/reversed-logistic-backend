'use strict';
const { faker } = require('@faker-js/faker');
const { CUSTOMER_TABLE } = require('../models/customer.model');

const arr = new Array(20).fill(null);

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      CUSTOMER_TABLE,
      arr.map(() => {
        return {
          company_name: faker.company.companyName(),
          rif: faker.datatype.number({ min: 100000000 }),
          description: '',
          website: faker.internet.url(),
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
  },
};
