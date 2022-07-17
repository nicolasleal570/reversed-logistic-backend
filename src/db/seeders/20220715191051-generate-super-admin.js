'use strict';
const bcrypt = require('bcrypt');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('password', 10);
    await queryInterface.bulkInsert(
      USER_TABLE,
      [
        {
          full_name: 'Super Admin',
          email: 'admin@email.com',
          password: hash,
          phone: '584241743990',
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
