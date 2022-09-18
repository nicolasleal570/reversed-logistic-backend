'use strict';
const { SHIPMENT_TABLE } = require('../models/shipment.model');

module.exports = {
  async up(queryInterface) {
    const arr = new Array(20).fill(null);

    await queryInterface.bulkInsert(
      SHIPMENT_TABLE,
      arr.map((_, index) => ({
        truck_id: index + 1,
        trackNumber: Math.random().toString(36).substring(2, 15),
        details: '',
        created_by_id: 1,
        created_at: new Date(),
      })),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SHIPMENT_TABLE, null, {});
  },
};
