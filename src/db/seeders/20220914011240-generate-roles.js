'use strict';
const { ROLE_TABLE } = require('../models/role.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      ROLE_TABLE,
      [
        {
          name: 'Administrador',
          value: 'SUDO',
          description:
            'Usuario con acceso a todos los módulos de la aplicación',
          created_at: new Date(),
          updated_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Coordinador de packing',
          value: 'PACKING_AUX',
          description: 'Usuario que ayuda a empacar los pedidos a los clientes',
          created_at: new Date(),
          updated_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Coordinador de envíos',
          value: 'SHIPPING_AUX',
          description: 'Usuario que se encarga de asignar un pedido a un envío',
          created_at: new Date(),
          updated_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Coordinador de recogidas',
          value: 'PICKUP_AUX',
          description:
            'Usuario que se encarga de revisar las órdenes de recogida de los cases',
          created_at: new Date(),
          updated_at: new Date(),
          created_by_id: 1,
        },
        {
          name: 'Conductor de camión',
          value: 'DRIVER',
          description:
            'Usuario que maneja los camiones para hacer las entregas',
          created_at: new Date(),
          updated_at: new Date(),
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
