const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CASE_CONTENT_TABLE = 'cases_content';

const CaseContentSchema = {
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
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class CaseContent extends Model {
  static associate(_models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASE_CONTENT_TABLE,
      modelName: 'CaseContent',
      timestamps: false,
    };
  }
}

module.exports = {
  CASE_CONTENT_TABLE,
  CaseContentSchema,
  CaseContent,
};
