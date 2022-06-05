require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY || '123456',
  dbUser: process.env.DB_USER || 'nico',
  dbPassword: process.env.DB_PASSWORD || 'nico',
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbName: process.env.DB_NAME || 'regression_logistic_app',
  dbPort: process.env.DB_PORT || 5432,
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  recoveryLink:
    process.env.RECOVERY_LINK || `http://localhost:${process.env.PORT || 3000}`,
  nodemailerEmail: process.env.NODEMAILER_MAIL,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,
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
