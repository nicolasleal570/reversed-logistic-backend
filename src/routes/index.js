const express = require('express');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const rolesRoutes = require('./roles.routes');
const permissionsRoutes = require('./permissions.routes');
const customersRoutes = require('./customers.routes');
const customerLocationsRoutes = require('./customer-locations.routes');
const casesRoutes = require('./cases.routes');
const casesContentRoutes = require('./cases-content.routes');
const caseProcessStepsRoutes = require('./case-process-steps.routes');
const { checkApiKey } = require('../middlewares/auth.handler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', checkApiKey, router);

  router.use('/auth', authRoutes);
  router.use('/users', usersRoutes);
  router.use('/roles', rolesRoutes);
  router.use('/permissions', permissionsRoutes);
  router.use('/customers', customersRoutes);
  router.use('/customer-locations', customerLocationsRoutes);
  router.use('/cases', casesRoutes);
  router.use('/cases-content', casesContentRoutes);
  router.use('/case-process-steps', caseProcessStepsRoutes);
}

module.exports = routerApi;
