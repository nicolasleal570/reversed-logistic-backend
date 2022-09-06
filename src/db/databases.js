const { DB_URI } = require('../config/environment');

module.exports = {
  development: {
    url: DB_URI,
    dialect: 'postgres',
    logging: true,
  },
  production: {
    url: DB_URI,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  },
};
