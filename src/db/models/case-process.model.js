const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CASE_TABLE } = require('./case.model');
const { CASE_CONTENT_TABLE } = require('./case-content.model');

const CASE_PROCESS_TABLE = 'case_processes';

const CaseProcessSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  caseId: {
    field: 'case_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: CASE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  caseContentId: {
    field: 'case_content_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: CASE_CONTENT_TABLE,
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
  },
  finishedAt: {
    field: 'finished_at',
    allowNull: false,
    type: DataTypes.DATE,
  },
};

class CaseProcess extends Model {
  static associate(models) {
    this.belongsTo(models.Case, { as: 'case' });
    this.belongsTo(models.CaseContent, { as: 'caseContent' });
    this.belongsTo(models.ProcessStep, { as: 'starterProcessStep' });
    this.belongsTo(models.User, { as: 'createdBy' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASE_PROCESS_TABLE,
      modelName: 'CaseProcess',
      timestamps: false,
    };
  }
}

module.exports = {
  CASE_PROCESS_TABLE,
  CaseProcessSchema,
  CaseProcess,
};
