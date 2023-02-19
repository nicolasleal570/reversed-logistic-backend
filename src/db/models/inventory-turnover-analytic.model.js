const { Model, DataTypes } = require('sequelize');

const INVENTORY_TURNOVER_ANALYTICS_TABLE = 'inventory_turnover_analytics';

const InventoryTurnoverAnalyticSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  count: {
    allowNull: true,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    field: 'deleted_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class InventoryTurnoverAnalytic extends Model {
  static associate(_models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVENTORY_TURNOVER_ANALYTICS_TABLE,
      modelName: 'InventoryTurnoverAnalytic',
      timestamps: false,
    };
  }
}

module.exports = {
  INVENTORY_TURNOVER_ANALYTICS_TABLE,
  InventoryTurnoverAnalyticSchema,
  InventoryTurnoverAnalytic,
};
