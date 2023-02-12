'use strict';
const dayjs = require('dayjs');
const { CUSTOMER_TABLE } = require('../models/customer.model');

const createCustomer = (companyName, rif, description, website) => {
  const date = dayjs().subtract(5, 'hour').toDate();

  return {
    company_name: companyName,
    rif,
    description,
    website,
    created_at: date,
    updated_at: date,
  };
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      CUSTOMER_TABLE,
      [
        createCustomer(
          'Fresh Fish C.A',
          'Vive una experiencia gastronómica única en nuestras tiendas Market + Bistro donde también conseguirás productos Fresh Fish, nacionales e importados',
          'J410793953',
          'https://www.freshfishdelivery.com/'
        ),
        createCustomer(
          'MoDo Caracas',
          'Centro de entretenimiento y gastronomía que se adapta a tu modo del día',
          'J198791332',
          'https://www.instagram.com/modoccs/'
        ),
        createCustomer(
          'Experience By Victor and Pastries',
          'Restaurante y pasteleria de autor con coctelería moderna',
          'J832791156',
          'https://victorpastriesgourmet.com/'
        ),
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
  },
};
