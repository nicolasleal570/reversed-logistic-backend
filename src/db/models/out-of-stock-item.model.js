const { Model, DataTypes } = require('sequelize');
const { CASE_TABLE } = require('./case.model');
const { CASE_CONTENT_TABLE } = require('./case-content.model');
const { ORDER_TABLE } = require('./order.model');
const { OUT_OF_STOCK_ORDER_TABLE } = require('./out-of-stock-order.model');

const OUT_OF_STOCK_ITEM_TABLE = 'out_of_stock_items';

const OutOfStockItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  wasReturned: {
    field: 'was_returned',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  atWarehouse: {
    field: 'clean_process_done',
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  needsCleanProcess: {
    field: 'needs_clean_process',
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cleanProcessDone: {
    field: 'clean_process_done',
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  finished: {
    allowNull: true,
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
  outOfStockOrderId: {
    field: 'out_of_stock_order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: OUT_OF_STOCK_ORDER_TABLE,
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

class OutOfStockItem extends Model {
  static associate(models) {
    this.belongsTo(models.Case, { as: 'case' });
    this.belongsTo(models.CaseContent, { as: 'caseContent' });
    this.belongsTo(models.Order, { as: 'order' });
    this.belongsTo(models.OutOfStockOrder, { as: 'outOfStockOrder' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OUT_OF_STOCK_ITEM_TABLE,
      modelName: 'OutOfStockItem',
      timestamps: false,
    };
  }
}

module.exports = {
  OUT_OF_STOCK_ITEM_TABLE,
  OutOfStockItemSchema,
  OutOfStockItem,
};
