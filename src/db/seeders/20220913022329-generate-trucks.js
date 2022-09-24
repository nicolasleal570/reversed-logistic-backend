'use strict';
const { faker } = require('@faker-js/faker');
const { TRUCK_TABLE } = require('../models/truck.model');

const arr = new Array(20).fill(null);

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      TRUCK_TABLE,
      arr.map(() => ({
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        license_plate: faker.vehicle.vrm(),
        created_at: new Date(),
        updated_at: new Date(),
      })),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TRUCK_TABLE, null, {});
  },
};
