const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { ROLE_TABLE } = require('./role.model');

const USER_ROLES_TABLE = 'user_roles';

const UserRolesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: ROLE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    field: 'deleted_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class UserRoles extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { as: 'role' });
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_ROLES_TABLE,
      modelName: 'UserRoles',
      timestamps: false,
    };
  }
}

module.exports = {
  USER_ROLES_TABLE,
  UserRolesSchema,
  UserRoles,
};
