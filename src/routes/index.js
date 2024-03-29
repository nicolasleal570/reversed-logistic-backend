const express = require('express');
const analyticsRoutes = require('./analytics.routes');
const helpersRoutes = require('./helpers.routes');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const rolesRoutes = require('./roles.routes');
const permissionsRoutes = require('./permissions.routes');
const customersRoutes = require('./customers.routes');
const customerLocationsRoutes = require('./customer-locations.routes');
const casesRoutes = require('./cases.routes');
const casesContentRoutes = require('./cases-content.routes');
const orderStatusRoutes = require('./order-status.routes');
const ordersRoutes = require('./orders.routes');
const orderItemsRoutes = require('./order-items.routes');
const trucksRoutes = require('./trucks.routes');
const shipmentsRoutes = require('./shipments.routes');
const shipmentStatusRoutes = require('./shipment-status.routes');
const processStepsRoutes = require('./process-steps.routes');
const cleanProcessStatusRoutes = require('./clean-process-status.routes');
const cleanProcessOrderRoutes = require('./clean-process-orders.routes');
const caseCleanProcessStepsRoutes = require('./case-clean-process-steps.routes');
const outOfStockStatusRoutes = require('./out-of-stock-status.routes');
const outOfStockOrderRoutes = require('./out-of-stock-order.routes');
const outOfStockItemsRoutes = require('./out-of-stock-items.routes');
const casesStatusLogsRoutes = require('./cases-status-logs.routes');

const { checkApiKey } = require('../middlewares/auth.handler');
const { config } = require('../config/environment');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', checkApiKey, router);

  router.use('/analytics', analyticsRoutes);
  router.use('/auth', authRoutes);
  router.use('/users', usersRoutes);
  router.use('/roles', rolesRoutes);
  router.use('/permissions', permissionsRoutes);
  router.use('/customers', customersRoutes);
  router.use('/customer-locations', customerLocationsRoutes);
  router.use('/cases', casesRoutes);
  router.use('/cases-content', casesContentRoutes);
  router.use('/order-status', orderStatusRoutes);
  router.use('/orders', ordersRoutes);
  router.use('/order-items', orderItemsRoutes);
  router.use('/trucks', trucksRoutes);
  router.use('/shipments', shipmentsRoutes);
  router.use('/shipment-status', shipmentStatusRoutes);
  router.use('/process-steps', processStepsRoutes);
  router.use('/clean-process-status', cleanProcessStatusRoutes);
  router.use('/clean-process-orders', cleanProcessOrderRoutes);
  router.use('/case-clean-process-steps', caseCleanProcessStepsRoutes);
  router.use('/out-of-stock-status', outOfStockStatusRoutes);
  router.use('/out-of-stock-order', outOfStockOrderRoutes);
  router.use('/out-of-stock-items', outOfStockItemsRoutes);
  router.use('/cases-status-logs', casesStatusLogsRoutes);

  if (!config.isProd) {
    router.use('/helpers', helpersRoutes);
  }
}

module.exports = routerApi;
