const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const PROCESS_STEP_TABLE = 'case_process_steps';

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
  nextProcessStepId: {
    field: 'next_process_step_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    References: {
      model: PROCESS_STEP_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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
  static associate(models) {
    this.belongsTo(models.ProcessStep, { as: 'nextProcessStep' });
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
