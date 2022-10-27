const { Model, DataTypes } = require('sequelize');
const { CASE_TABLE } = require('./case.model');

const CASES_STATUS_LOGS_TABLE = 'cases_status_logs';

const CasesStatusLogsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
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

class CasesStatusLog extends Model {
  static associate(models) {
    this.belongsTo(models.Case, { as: 'case' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASES_STATUS_LOGS_TABLE,
      modelName: 'CasesStatusLog',
      timestamps: false,
    };
  }
}

module.exports = {
  CASES_STATUS_LOGS_TABLE,
  CasesStatusLogsSchema,
  CasesStatusLog,
};
