'use strict';
const { ShipmentSchema, SHIPMENT_TABLE } = require('../models/shipment.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SHIPMENT_TABLE, ShipmentSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(SHIPMENT_TABLE);
  },
};
