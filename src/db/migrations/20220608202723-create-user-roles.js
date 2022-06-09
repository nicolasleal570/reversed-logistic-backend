'use strict';
const {
  UserRolesSchema,
  USER_ROLES_TABLE,
} = require('../models/user-roles.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_ROLES_TABLE, UserRolesSchema);
  },
  async down(queryInterface) {
    await queryInterface.dropTable(USER_ROLES_TABLE);
  },
};
