const { Model, DataTypes } = require('sequelize');
const { ROLE_TABLE } = require('./role.model');
const { PERMISSION_TABLE } = require('./permission.model');

const ROLE_PERMISSION_TABLE = 'roles_permissions';

const RolePermissionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  permissionId: {
    field: 'permission_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: PERMISSION_TABLE,
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

class RolePermission extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { as: 'role' });
    this.belongsTo(models.Permission, { as: 'permission' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_PERMISSION_TABLE,
      modelName: 'RolePermission',
      timestamps: false,
    };
  }
}

module.exports = {
  ROLE_PERMISSION_TABLE,
  RolePermissionSchema,
  RolePermission,
};
