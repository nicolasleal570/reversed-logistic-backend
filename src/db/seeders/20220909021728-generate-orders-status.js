'use strict';
const { ORDER_STATUS_TABLE } = require('../models/order-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      ORDER_STATUS_TABLE,
      [
        {
          name: 'En cola de preparación',
          description:
            'Este estado representa las órdenes que aún están en cola esperando ser atendidas.',
          value: 'QUEUED',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'En preparación',
          description:
            'Este estado representa las órdenes que están siendo atendidas y preparadas.',
          value: 'IN_TRANSIT',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Preparación finalizada',
          description:
            'Este estado representa las órdenes que ya fueron preradas para ser enviadas.',
          value: 'FINISHED',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
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
          name: 'Entregado al cliente',
          description:
            'Este estado representa las órdenes que ya fueron entregadas al cliente.',
          value: 'SHIPMENT_DONE',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cancelada',
          description:
            'Este estado representa las órdenes que fueron canceladas.',
          value: 'CANCELLED',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ORDER_STATUS_TABLE, null, {});
  },
};
