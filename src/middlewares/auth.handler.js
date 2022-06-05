const boom = require('@hapi/boom');
const { config } = require('../config/environment');

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
function checkRoles() {}

module.exports = {
  checkApiKey,
  checkRoles,
};
