const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const OUT_OF_STOCK_STATUS_TABLE = 'out_of_stock_status';

const OutOfStockStatusSchema = {
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

class OutOfStockStatus extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OUT_OF_STOCK_STATUS_TABLE,
      modelName: 'OutOfStockStatus',
      timestamps: false,
    };
  }
}

module.exports = {
  OUT_OF_STOCK_STATUS_TABLE,
  OutOfStockStatusSchema,
  OutOfStockStatus,
};
