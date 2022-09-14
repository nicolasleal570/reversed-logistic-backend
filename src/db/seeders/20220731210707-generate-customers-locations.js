'use strict';
const { faker } = require('@faker-js/faker');
const {
  CUSTOMER_LOCATION_TABLE,
} = require('../models/customer-location.model');

const arr = new Array(20).fill(null);

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      CUSTOMER_LOCATION_TABLE,
      arr.map((_, index) => {
        return {
          line_1: faker.address.streetAddress(),
          zip_code: faker.address.zipCode(),
          city: faker.address.city(),
          state: faker.address.state(),
          contact: faker.phone.number(),
          customer_id: index + 1,
          created_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CUSTOMER_LOCATION_TABLE, null, {});
  },
};
