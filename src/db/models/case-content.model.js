const { Model, DataTypes } = require('sequelize');

const CASE_CONTENT_TABLE = 'cases_content';

const CaseContentSchema = {
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
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  tax: {
    allowNull: true,
    type: DataTypes.FLOAT,
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

class CaseContent extends Model {
  static associate(models) {
    this.belongsToMany(models.Order, {
      as: 'orders',
      through: models.OrderItem,
      foreignKey: 'caseContentId',
      otherKey: 'orderId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASE_CONTENT_TABLE,
      modelName: 'CaseContent',
      timestamps: false,
    };
  }
}

module.exports = {
  CASE_CONTENT_TABLE,
  CaseContentSchema,
  CaseContent,
};
