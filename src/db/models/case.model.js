const { Model, DataTypes } = require('sequelize');

const CASE_TABLE = 'cases';
const availablesStates = {
  AVAILABLE: 'AVAILABLE', // Disponible para usarse
  IN_ORDER_PROCESS: 'IN_ORDER_PROCESS', // En proceso de venta
  WAITING_SHIPMENT: 'WAITING_SHIPMENT', // Esperando a ser enviado
  IN_SHIPMENT: 'IN_SHIPMENT', // Fue enviado, va en la vía
  IN_CUSTOMER_SERVICE: 'IN_CUSTOMER_SERVICE', // Fue entregado, está en uso el case
  CUSTOMER_OUT_OF_STOCK: 'CUSTOMER_OUT_OF_STOCK', // Se acabó el contenido del case
  WAITING_PICKUP: 'WAITING_PICKUP', // Esperando que sea recogido donde el cliente
  IN_CLEAN_PROCESS: 'IN_CLEAN_PROCESS', // Está en proceso de limpieza
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
