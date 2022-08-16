'use strict';
const { faker } = require('@faker-js/faker');
const { CASE_CONTENT_TABLE } = require('../models/case-content.model');

const arr = new Array(20).fill(null);

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      CASE_CONTENT_TABLE,
      arr.map(() => {
        return {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          created_at: new Date(),
        };
      }),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CASE_CONTENT_TABLE, null, {});
  },
};
