const { Model, DataTypes } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  companyName: {
    field: 'company_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  rif: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  website: {
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

class Customer extends Model {
  static associate(models) {
    this.hasMany(models.CustomerLocation, {
      as: 'locations',
      foreignKey: 'customerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = {
  CUSTOMER_TABLE,
  CustomerSchema,
  Customer,
};
