const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CLEAN_PROCESS_STATUS_TABLE = 'clean_process_status';

const CleanProcessStatusSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  value: {
    allowNull: false,
    type: DataTypes.STRING,
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
  createdById: {
    field: 'created_by_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class CleanProcessStatus extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLEAN_PROCESS_STATUS_TABLE,
      modelName: 'CleanProcessStatus',
      timestamps: false,
    };
  }
}

module.exports = {
  CLEAN_PROCESS_STATUS_TABLE,
  CleanProcessStatusSchema,
  CleanProcessStatus,
};
