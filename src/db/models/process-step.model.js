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
  instructions: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  guidelines: {
    allowNull: false,
    type: DataTypes.TEXT,
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

class ProcessStep extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
  }

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
