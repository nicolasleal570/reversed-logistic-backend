const { Model, DataTypes } = require('sequelize');
const { CASE_TABLE } = require('./case.model');
const { CASE_CONTENT_TABLE } = require('./case-content.model');
const { ORDER_TABLE } = require('./order.model');

const ORDER_ITEM_TABLE = 'order_items';

const OrderItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  wasReturned: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  caseContentId: {
    field: 'case_content_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: CASE_CONTENT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class OrderItem extends Model {
  static associate(models) {
    this.belongsTo(models.Case, { as: 'case' });
    this.belongsTo(models.CaseContent, { as: 'caseContent' });
    this.belongsTo(models.Order, { as: 'order' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_ITEM_TABLE,
      modelName: 'OrderItem',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_ITEM_TABLE,
  OrderItemSchema,
  OrderItem,
};
