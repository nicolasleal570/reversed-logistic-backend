const { Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const CUSTOMER_LOCATION_TABLE = 'customers_locations';

const CustomerLocationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  line1: {
    field: 'line_1',
    allowNull: false,
    type: DataTypes.TEXT,
  },
  line2: {
    field: 'line_2',
    allowNull: true,
    type: DataTypes.STRING,
  },
  zipCode: {
    field: 'zip_code',
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'venezuela',
  },
  contact: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    References: {
      model: CUSTOMER_TABLE,
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

class CustomerLocation extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_LOCATION_TABLE,
      modelName: 'CustomerLocation',
      timestamps: false,
    };
  }
}

module.exports = {
  CUSTOMER_LOCATION_TABLE,
  CustomerLocationSchema,
  CustomerLocation,
};
