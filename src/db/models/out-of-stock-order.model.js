const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CUSTOMER_LOCATION_TABLE } = require('./customer-location.model');
const { OUT_OF_STOCK_STATUS_TABLE } = require('./out-of-stock-status.model');

const OUT_OF_STOCK_ORDER_TABLE = 'out_of_stock_order';

const OutOfStockOrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  statusId: {
    field: 'status_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: OUT_OF_STOCK_STATUS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    defaultValue: 1,
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
  assignedToId: {
    field: 'assigned_to_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    References: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  pickedUpAt: {
    field: 'picked_up_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
  doneAt: {
    field: 'done_at',
    allowNull: true,
    type: DataTypes.DATE,
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

class OutOfStockOrder extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
    this.belongsTo(models.User, { as: 'assignedTo' });
    this.belongsTo(models.CustomerLocation, { as: 'customerLocation' });
    this.belongsTo(models.OutOfStockStatus, { as: 'status' });
    this.hasMany(models.OutOfStockItem, {
      as: 'items',
      foreignKey: 'outOfStockOrderId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OUT_OF_STOCK_ORDER_TABLE,
      modelName: 'OutOfStockOrder',
      timestamps: false,
    };
  }
}

module.exports = {
  OUT_OF_STOCK_ORDER_TABLE,
  OutOfStockOrderSchema,
  OutOfStockOrder,
};
