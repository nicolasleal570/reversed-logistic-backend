'use strict';
const { PROCESS_STEP_TABLE } = require('../models/process-step.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      PROCESS_STEP_TABLE,
      [
        {
          name: 'Retirar contenido',
          description: 'Retirar todo el contenido del case',
          guidelines:
            'Debe retirar la tapa y desechar todo el contenido interno del case',
          instructions:
            'Debe retirar la tapa y desechar todo el contenido interno del case',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Limpiar con agua a presión',
          description: 'Limpiar con agua a presión',
          guidelines: 'Limpiar con agua a presión',
          instructions: 'Limpiar con agua a presión',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Hervir el case',
          description: 'Debe poner a hervir el case a 100 grados C',
          guidelines:
            'Debe poner a hervir el case a 100 grados C por 30 minutos',
          instructions:
            'Debe poner a hervir el case a 100 grados C por 30 minutos',
          created_by_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PROCESS_STEP_TABLE, null, {});
  },
};
