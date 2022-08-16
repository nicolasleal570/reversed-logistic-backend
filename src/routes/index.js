const express = require('express');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const rolesRoutes = require('./roles.routes');
const permissionsRoutes = require('./permissions.routes');
const customersRoutes = require('./customers.routes');
const customerLocationsRoutes = require('./customer-locations.routes');
const casesRoutes = require('./cases.routes');
const casesContentRoutes = require('./cases-content.routes');
const processStepsRoutes = require('./process-steps.routes');
const caseProcessRoutes = require('./case-processes.routes');
const orderStatusRoutes = require('./order-status.routes');
const ordersRoutes = require('./orders.routes');
const orderItemsRoutes = require('./order-items.routes');
const trucksRoutes = require('./trucks.routes');
const shipmentsRoutes = require('./shipments.routes');
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
  router.use('/process-steps', processStepsRoutes);
  router.use('/case-process', caseProcessRoutes);
  router.use('/order-status', orderStatusRoutes);
  router.use('/orders', ordersRoutes);
  router.use('/order-items', orderItemsRoutes);
  router.use('/trucks', trucksRoutes);
  router.use('/shipments', shipmentsRoutes);
}

module.exports = routerApi;
