const boom = require('@hapi/boom');
const { config } = require('../config/environment');
/*
const { sequelize } = require('../db/sequelize');
const UserService = require('../services/users.service');

const { Role, RolePermission, UserRole } = sequelize.models;
const userService = new UserService();
*/

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
async function checkRoles(_req, _res, next) {
  /*
  const { user: token, method } = req;

  if (!token?.sub) {
    return next(boom.internal('Something went wrong checking role'));
  }

  const user = await userService.findOne(token.sub);

  const methods = {
    GET: 'READ',
    POST: 'CREATE',
    DELETE: 'DELETE',
    PATH: 'EDIT',
  };

  const action = methods[method];
*/

  next();
}

module.exports = {
  checkApiKey,
  checkRoles,
};
