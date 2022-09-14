'use strict';
const { ROLE_TABLE } = require('../models/role.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      ROLE_TABLE,
      [
        {
          name: 'Súper usuario',
          value: 'SUDO',
          description:
            'Usuario con acceso a todos los módulos de la aplicación',
          created_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Auxiliar de packing',
          value: 'PACKING_AUX',
          description: 'Usuario que ayuda a empacar los pedidos a los clientes',
          created_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Auxiliar de envíos',
          value: 'SHIPPING_AUX',
          description: 'Usuario que se encarga de asignar un pedido a un envío',
          created_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Auxiliar de recogida',
          value: 'PICKUP_AUX',
          description:
            'Usuario que se encarga de revisar las órdenes de recogida de los cases',
          created_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Conductor de camión',
          value: 'DRIVER',
          description:
            'Usuario que maneja los camiones para hacer las entregas',
          created_at: new Date(),
          created_by_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ROLE_TABLE, null, {});
  },
};
