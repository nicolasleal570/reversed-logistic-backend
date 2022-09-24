const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const TRUCK_TABLE = 'trucks';

const values = ['AVAILABLE', 'BUSY'];

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
  status: {
    allowNull: false,
    type: DataTypes.ENUM({ values }),
    defaultValue: values[0],
  },
  userId: {
    field: 'user_id',
    allowNull: true,
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
