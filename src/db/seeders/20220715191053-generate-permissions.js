'use strict';
const { PERMISSION_TABLE } = require('../models/permission.model');

module.exports = {
  async up(queryInterface) {
    const createdAt = new Date();

    await queryInterface.bulkInsert(
      PERMISSION_TABLE,
      [
        {
          name: 'Lectura',
          description: 'Puede leer información del módulo de cases',
          value: 'CASES_READ',
          created_at: createdAt,
          created_by_id: 1,
        },
        {
          name: 'Crear',
          description: 'Puede crear nueva información en el módulo de cases',
          value: 'CASES_CREATE',
          created_at: createdAt,
          created_by_id: 1,
        },
        {
          name: 'Actualizar',
          description: 'Puede actualizar información en el módulo de cases',
          value: 'CASES_UPDATE',
          created_at: createdAt,
          created_by_id: 1,
        },
        {
          name: 'Eliminar',
          description: 'Puede eliminar información en el módulo de cases',
          value: 'CASES_DELETE',
          created_at: createdAt,
          created_by_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PERMISSION_TABLE, null, {});
  },
};
