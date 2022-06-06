const express = require('express');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const rolesRoutes = require('./roles.routes');
const permissionsRoutes = require('./permissions.routes');
const { checkApiKey } = require('../middlewares/auth.handler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', checkApiKey, router);

  router.use('/auth', authRoutes);
  router.use('/users', usersRoutes);
  router.use('/roles', rolesRoutes);
  router.use('/permissions', permissionsRoutes);
}

module.exports = routerApi;
