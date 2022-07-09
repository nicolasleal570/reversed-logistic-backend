'use strict';
const { TruckSchema, TRUCK_TABLE } = require('../models/truck.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(TRUCK_TABLE, TruckSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TRUCK_TABLE);
  },
};
