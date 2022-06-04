require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || 'nico',
  dbPassword: process.env.DB_PASSWORD || 'nico',
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbName: process.env.DB_NAME || 'regression_logistic_app',
  dbPort: process.env.DB_PORT || 5432,
};

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);
const DB_URI = `postgres://${DB_USER}:${DB_PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  config,
  DB_USER,
  DB_PASSWORD,
  DB_URI,
};
