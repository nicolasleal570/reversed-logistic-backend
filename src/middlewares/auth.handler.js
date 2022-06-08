const boom = require('@hapi/boom');
const { config } = require('../config/environment');
const { sequelize } = require('../db/sequelize');

const { Role, RolePermission } = sequelize.models;

function checkApiKey(req, _, next) {
  const apiKey = req.headers['api'];
  if (!apiKey) {
    return next(boom.unauthorized('Missing API Key'));
  }

  if (apiKey !== config.apiKey) {
    return next(boom.unauthorized('Invalid API Key'));
  }

  return next();
}

// TODO: Handle Roles and permissions logic
async function checkRoles(req, _res, next) {
  const { user, method } = req;

  const methods = {
    GET: 'READ',
    POST: 'CREATE',
    DELETE: 'DELETE',
    PATH: 'EDIT',
  };

  console.log({ method: methods[method], userId: user.sub });

  next();
}

module.exports = {
  checkApiKey,
  checkRoles,
};
