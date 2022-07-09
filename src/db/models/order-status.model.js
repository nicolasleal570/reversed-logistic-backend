const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const ORDER_STATUS_TABLE = 'order_status';

const OrderStatusSchema = {
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
  value: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
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

class OrderStatus extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_STATUS_TABLE,
      modelName: 'OrderStatus',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_STATUS_TABLE,
  OrderStatusSchema,
  OrderStatus,
};
