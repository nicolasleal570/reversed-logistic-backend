'use strict';
const dayjs = require('dayjs');
const { CASE_CONTENT_TABLE } = require('../models/case-content.model');

const createBeerFlavor = (name, description, price) => {
  const date = dayjs().subtract(5, 'hour').toDate();

  return {
    name,
    description,
    price,
    tax: 0,
    created_at: date,
    updated_at: date,
  };
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      CASE_CONTENT_TABLE,
      [
        createBeerFlavor('Pilsen', 'Cerveza con sabor a hierba y madera.', 16),
        createBeerFlavor(
          'Cerveza estilo ale',
          'Ale es un nombre que abarca a todas las cervezas de fermentación alta, lo que las diferencia de las lager que son de fermentación baja.',
          20
        ),
        createBeerFlavor(
          'Lager',
          'Lager es un tipo de cerveza con sabor acentuado que se sirve fría, caracterizada por fermentar en condiciones más lentas empleando levaduras especiales',
          22
        ),
        createBeerFlavor(
          'Kolsch',
          'La Kolsch es una especialidad local de cerveza elaborada en Colonia. Es una cerveza clara, su tonalidad es amarilla brillante y tiene un gusto prominente, pero no extremo de lúpulo.',
          18
        ),
        createBeerFlavor(
          'Cerveza de trigo',
          'La cerveza de trigo es una cerveza, generalmente de fermentación alta o ale, que se elabora con una gran proporción de trigo en relación con la cantidad de cebada malteada.',
          12
        ),
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CASE_CONTENT_TABLE, null, {});
  },
};
