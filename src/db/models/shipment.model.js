const { Model, DataTypes } = require('sequelize');
const { TRUCK_TABLE } = require('./truck.model');
const { USER_TABLE } = require('./user.model');

const SHIPMENT_TABLE = 'shipments';

const ShipmentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  trackNumber: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  details: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  shipmentAt: {
    field: 'shipment_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
  deliveredAt: {
    field: 'delivered_at',
    allowNull: true,
    type: DataTypes.DATE,
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
  truckId: {
    field: 'truck_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: TRUCK_TABLE,
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
};

class Shipment extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
    this.belongsTo(models.Truck, { as: 'truck' });
    this.hasMany(models.Order, { as: 'orders', foreignKey: 'shipmentId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SHIPMENT_TABLE,
      modelName: 'Shipment',
      timestamps: false,
    };
  }
}

module.exports = {
  SHIPMENT_TABLE,
  ShipmentSchema,
  Shipment,
};
