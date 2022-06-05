const express = require('express');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const { checkApiKey } = require('../middlewares/auth.handler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', checkApiKey, router);

  router.use('/auth', authRoutes);
  router.use('/users', usersRoutes);
}

module.exports = routerApi;
