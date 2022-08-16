const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const PROCESS_STEP_TABLE = 'process_steps';

const ProcessStepSchema = {
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
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class ProcessStep extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROCESS_STEP_TABLE,
      modelName: 'ProcessStep',
      timestamps: false,
    };
  }
}

module.exports = {
  PROCESS_STEP_TABLE,
  ProcessStepSchema,
  ProcessStep,
};
