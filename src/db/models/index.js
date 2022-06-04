const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  // Handle models init
  // Ej. User.init(UserSchema, User.config(sequelize))
  User.init(UserSchema, User.config(sequelize));

  // Handle models asocciations
  // Ej. User.associate(sequelize.models)
  User.associate(sequelize.models);
}

module.exports = {
  setupModels,
};
