const { Model, DataTypes } = require('sequelize');

const CASE_TABLE = 'cases';
const availablesStates = {
  AVAILABLE: 'AVAILABLE',
  IN_ORDER_PROCESS: 'IN_ORDER_PROCESS',
  IN_SHIPMENT: 'IN_SHIPMENT',
  IN_CUSTOMER_SERVICE: 'IN_CUSTOMER_SERVICE',
  CUSTOMER_OUT_OF_STOCK: 'CUSTOMER_OUT_OF_STOCK',
  WAITING_PICKUP: 'WAITING_PICKUP',
  IN_CLEAN_PROCESS: 'IN_CLEAN_PROCESS',
};

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
    type: DataTypes.INTEGER,
  },
  weight: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  state: {
    allowNull: true,
    type: DataTypes.ENUM({ values: Object.values(availablesStates) }),
    defaultValue: availablesStates.AVAILABLE,
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
  availablesStates,
};
