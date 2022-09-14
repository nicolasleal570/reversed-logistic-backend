'use strict';
const {
  ShipmentStatusSchema,
  SHIPMENT_STATUS_TABLE,
} = require('../models/shipment-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      SHIPMENT_STATUS_TABLE,
      ShipmentStatusSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(SHIPMENT_STATUS_TABLE);
  },
};
