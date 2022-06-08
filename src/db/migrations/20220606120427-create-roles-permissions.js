'use strict';
const {
  RolePermissionSchema,
  ROLE_PERMISSION_TABLE,
} = require('../models/role-permission.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      ROLE_PERMISSION_TABLE,
      RolePermissionSchema
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable(ROLE_PERMISSION_TABLE);
  },
};
