const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CASE_PROCESS_STEP_TABLE = 'case_process_steps';

const CaseProcessStepSchema = {
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
  nextProcessStepId: {
    field: 'next_process_step_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    References: {
      model: CASE_PROCESS_STEP_TABLE,
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
};

class CaseProcessStep extends Model {
  static associate(models) {
    this.belongsTo(models.CaseProcessStep, { as: 'nextProcessStep' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASE_PROCESS_STEP_TABLE,
      modelName: 'CaseProcessStep',
      timestamps: false,
    };
  }
}

module.exports = {
  CASE_PROCESS_STEP_TABLE,
  CaseProcessStepSchema,
  CaseProcessStep,
};
