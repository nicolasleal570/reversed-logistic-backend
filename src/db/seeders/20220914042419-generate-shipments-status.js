'use strict';
const { SHIPMENT_STATUS_TABLE } = require('../models/shipment-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      SHIPMENT_STATUS_TABLE,
      [
        {
          name: 'Esperando que sea enviada',
          description:
            'Este estado representa que la órden ya está lista esperando que el envío se haga.',
          value: 'WAITING_SHIPMENT',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'En camino',
          description:
            'Este estado representa las órdenes que están en proceso de envío.',
          value: 'IN_SHIPMENT',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Entregado en destino',
          description:
            'Este estado representa las órdenes que ya fueron entregadas al cliente.',
          value: 'SHIPMENT_DONE',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SHIPMENT_STATUS_TABLE, null, {});
  },
};
