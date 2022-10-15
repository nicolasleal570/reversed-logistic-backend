'use strict';
const bcrypt = require('bcrypt');
const { USER_TABLE } = require('../models/user.model');
const { USER_ROLES_TABLE } = require('../models/user-roles.model');

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
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      USER_ROLES_TABLE,
      [
        {
          user_id: 1,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
