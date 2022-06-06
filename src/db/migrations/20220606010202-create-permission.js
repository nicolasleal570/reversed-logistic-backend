'use strict';
const {
  PermissionSchema,
  PERMISSION_TABLE,
} = require('../models/permission.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PERMISSION_TABLE, PermissionSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(PERMISSION_TABLE);
  },
};
