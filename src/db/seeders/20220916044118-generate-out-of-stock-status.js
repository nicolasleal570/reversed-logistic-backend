'use strict';
const {
  OUT_OF_STOCK_STATUS_TABLE,
} = require('../models/out-of-stock-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      OUT_OF_STOCK_STATUS_TABLE,
      [
        {
          name: 'Contenido agotado',
          description:
            'Este estado representa que los cases fueron reportados como agotados.',
          value: 'OUT_OF_STOCK',
          created_by_id: 1,
          created_at: new Date(),
        },
        {
          name: 'Recogida en progreso',
          description:
            'Este estado representa que los cases están siendo idos a buscar.',
          value: 'PICKUP_IN_PROGRESS',
          created_by_id: 1,
          created_at: new Date(),
        },
        {
          name: 'Recogida lista',
          description:
            'Este estado representa que los cases ya fueron recogidos.',
          value: 'PICKUP_DONE',
          created_by_id: 1,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(OUT_OF_STOCK_STATUS_TABLE, null, {});
  },
};
