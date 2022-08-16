const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const TRUCK_TABLE = 'trucks';

const TruckSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  brand: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  model: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: 'Camión',
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  licensePlate: {
    field: 'license_plate',
    allowNull: false,
    type: DataTypes.STRING,
  },
  capacity: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Truck extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'driver', foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TRUCK_TABLE,
      modelName: 'Truck',
      timestamps: false,
    };
  }
}

module.exports = {
  TRUCK_TABLE,
  TruckSchema,
  Truck,
};
