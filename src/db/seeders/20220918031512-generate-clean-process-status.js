'use strict';
const {
  CLEAN_PROCESS_STATUS_TABLE,
} = require('../models/clean-process-status.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      CLEAN_PROCESS_STATUS_TABLE,
      [
        {
          name: 'En cola de limpieza',
          description:
            'Este estado representa el case aún está en cola esperando ser atendido por el departamento de limpieza.',
          value: 'CLEAN_PROCESS_QUEUED',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'En proceso de limpieza',
          description:
            'Este estado representa que el case ya están siendo limpiado y procesado.',
          value: 'IN_CLEAN_PROCESS',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Limpieza terminada',
          description:
            'Este estado representa que el case ya fue terminado y está listo para habilitarse.',
          value: 'CLEAN_PROCESS_DONE',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CLEAN_PROCESS_STATUS_TABLE, null, {});
  },
};
