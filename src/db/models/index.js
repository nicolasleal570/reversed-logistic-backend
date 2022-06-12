const { User, UserSchema } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');
const { Permission, PermissionSchema } = require('./permission.model');
const {
  RolePermission,
  RolePermissionSchema,
} = require('./role-permission.model');
const { UserRoles, UserRolesSchema } = require('./user-roles.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { CustomerLocation, CustomerLocationSchema } = require('./customer-location.model');

function setupModels(sequelize) {
  // Handle models init
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Permission.init(PermissionSchema, Permission.config(sequelize));
  RolePermission.init(RolePermissionSchema, RolePermission.config(sequelize));
  UserRoles.init(UserRolesSchema, UserRoles.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  CustomerLocation.init(CustomerLocationSchema, CustomerLocation.config(sequelize));

  // Handle models asocciations
  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  Permission.associate(sequelize.models);
  RolePermission.associate(sequelize.models);
  UserRoles.associate(sequelize.models);
  Customer.associate(sequelize.models);
  CustomerLocation.associate(sequelize.models);
}

module.exports = {
  setupModels,
};
