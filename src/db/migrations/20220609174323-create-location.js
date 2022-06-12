'use strict';
const { CustomerLocationSchema, CUSTOMER_LOCATION_TABLE } = require('../models/customer-location.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_LOCATION_TABLE, CustomerLocationSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_LOCATION_TABLE);
  },
};
