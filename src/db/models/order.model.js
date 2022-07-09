const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CUSTOMER_LOCATION_TABLE } = require('./customer-location.model');
const { ORDER_STATUS_TABLE } = require('./order-status.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerLocationId: {
    field: 'customer_location_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: CUSTOMER_LOCATION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  subTotal: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  tax: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  total: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  orderStatusId: {
    field: 'order_status_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: ORDER_STATUS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  purchaseDate: {
    field: 'purchase_date',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
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

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
    this.belongsTo(models.CustomerLocation, { as: 'customerLocation' });
    this.belongsTo(models.OrderStatus, { as: 'orderStatus' });
    this.hasMany(models.OrderItem, { as: 'items', foreignKey: 'orderId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_TABLE,
  OrderSchema,
  Order,
};
