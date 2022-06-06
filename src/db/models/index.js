const { User, UserSchema } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');
const { Permission, PermissionSchema } = require('./permission.model');

function setupModels(sequelize) {
  // Handle models init
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Permission.init(PermissionSchema, Permission.config(sequelize));

  // Handle models asocciations
  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  Permission.associate(sequelize.models);
}

module.exports = {
  setupModels,
};
