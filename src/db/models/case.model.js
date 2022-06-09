const { Model, DataTypes } = require('sequelize');

const CASE_TABLE = 'cases';

const CaseSchema = {
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
  volume: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  weight: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Case extends Model {
  static associate(_models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASE_TABLE,
      modelName: 'Case',
      timestamps: false,
    };
  }
}

module.exports = {
  CASE_TABLE,
  CaseSchema,
  Case,
};
