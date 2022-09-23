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
  PICKUP_IN_PROGRESS: 'PICKUP_IN_PROGRESS', // Esperando que sea recogido donde el cliente
  PICKUP_DONE: 'PICKUP_DONE', // Se recogieron los case
  CLEAN_PROCESS_QUEUED: 'CLEAN_PROCESS_QUEUED', // Esperando en cola por limpieza
  IN_CLEAN_PROCESS: 'IN_CLEAN_PROCESS', // Está en proceso de limpieza
  CLEAN_PROCESS_DONE: 'CLEAN_PROCESS_DONE', // Está lista la limpieza
};

const orderStateToCaseState = {
  1: availablesStates.QUEUED,
  2: availablesStates.IN_TRANSIT,
  3: availablesStates.FINISHED,
  4: availablesStates.WAITING_SHIPMENT,
  5: availablesStates.IN_SHIPMENT,
  6: availablesStates.SHIPMENT_DONE,
};

const outOfStockOrderStateToCaseState = {
  1: availablesStates.OUT_OF_STOCK,
  2: availablesStates.PICKUP_IN_PROGRESS,
  3: availablesStates.PICKUP_DONE,
};

const cleanProcessOrderState = {
  1: availablesStates.CLEAN_PROCESS_QUEUED,
  2: availablesStates.IN_CLEAN_PROCESS,
  3: availablesStates.CLEAN_PROCESS_DONE,
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
    type: DataTypes.STRING,
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
  static associate(models) {
    this.belongsToMany(models.Order, {
      as: 'orders',
      through: models.OrderItem,
      foreignKey: 'caseId',
      otherKey: 'orderId',
    });
  }

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
  outOfStockOrderStateToCaseState,
  cleanProcessOrderState,
};
