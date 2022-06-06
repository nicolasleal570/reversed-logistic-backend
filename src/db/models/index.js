const { User, UserSchema } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');

function setupModels(sequelize) {
  // Handle models init
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));

  // Handle models asocciations
  User.associate(sequelize.models);
  Role.associate(sequelize.models);
}

module.exports = {
  setupModels,
};
