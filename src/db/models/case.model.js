const { Model, DataTypes } = require('sequelize');

const CASE_TABLE = 'cases';
const availablesStates = {
  AVAILABLE: 'AVAILABLE', // Disponible para usarse
  QUEUED: 'QUEUED', // Orden en cola
  IN_TRANSIT: 'IN_TRANSIT', // Orden en proceso de venta
  FINISHED: 'FINISHED', // Preparación de la orden lista
  WAITING_SHIPMENT: 'WAITING_SHIPMENT', // Esperando el envío
  IN_SHIPMENT: 'IN_SHIPMENT', // Envio en progreso
  SHIPMENT_DONE: 'SHIPMENT_DONE', // Fue entregado, está en uso el case
  OUT_OF_STOCK: 'OUT_OF_STOCK', // Se acabó el contenido del case
  WAITING_PICKUP: 'WAITING_PICKUP', // Esperando que sea recogido donde el cliente
  IN_CLEAN_PROCESS: 'IN_CLEAN_PROCESS', // Está en proceso de limpieza
};

const orderStateToCaseState = {
  1: availablesStates.QUEUED,
  2: availablesStates.IN_TRANSIT,
  3: availablesStates.FINISHED,
  4: availablesStates.WAITING_SHIPMENT,
  5: availablesStates.IN_SHIPMENT,
  6: availablesStates.SHIPMENT_DONE,
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
  orderStateToCaseState,
};
