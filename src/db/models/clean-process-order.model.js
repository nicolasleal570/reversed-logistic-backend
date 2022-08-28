const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { CASE_TABLE } = require('./case.model');
const { CASE_CONTENT_TABLE } = require('./case-content.model');
const { CUSTOMER_LOCATION_TABLE } = require('./customer-location.model');

const CLEAN_PROCESS_ORDER_TABLE = 'clean_process_orders';

const CleanProcessOrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  details: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  finishedAt: {
    field: 'finished_at',
    allowNull: true,
    type: DataTypes.DATE,
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

class CleanProcessOrder extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'createdBy' });
    this.belongsTo(models.Case, { as: 'case' });
    this.belongsTo(models.CaseContent, { as: 'caseContent' });
    this.belongsTo(models.CustomerLocation, { as: 'customerLocation' });
    this.hasMany(models.CaseCleanProcessStep, {
      as: 'steps',
      foreignKey: 'cleanProcessOrderId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLEAN_PROCESS_ORDER_TABLE,
      modelName: 'CleanProcessOrder',
      timestamps: false,
    };
  }
}

module.exports = {
  CLEAN_PROCESS_ORDER_TABLE,
  CleanProcessOrderSchema,
  CleanProcessOrder,
};
