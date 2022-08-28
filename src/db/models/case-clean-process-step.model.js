const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CASE_CONTENT_TABLE } = require('./case-content.model');
const { PROCESS_STEP_TABLE } = require('./process-step.model');

const CASE_CLEAN_PROCESS_STEP_TABLE = 'case_clean_process_steps';

const CaseCleanProcessStepSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  order: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  cleanProcessOrderId: {
    field: 'clean_process_order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: CASE_CONTENT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  processStepId: {
    field: 'process_step_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: PROCESS_STEP_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  isCurrent: {
    field: 'is_current',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDone: {
    field: 'is_done',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

class CaseCleanProcessStep extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
    this.belongsTo(models.CleanProcessOrder, { as: 'cleanProcessOrder' });
    this.belongsTo(models.ProcessStep, { as: 'processStep' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASE_CLEAN_PROCESS_STEP_TABLE,
      modelName: 'CaseCleanProcessStep',
      timestamps: false,
    };
  }
}

module.exports = {
  CASE_CLEAN_PROCESS_STEP_TABLE,
  CaseCleanProcessStepSchema,
  CaseCleanProcessStep,
};
