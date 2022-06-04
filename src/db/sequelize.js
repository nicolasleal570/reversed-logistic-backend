const { Sequelize } = require('sequelize');
const { DB_URI, config } = require('../config/environment');
const { setupModels } = require('./models');
const databaseConfig = require('./databases');

export const sequelize = new Sequelize(DB_URI, databaseConfig[config.env]);
