const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  ordersByCustomerLocations,
  deliveryAtTimeSchema,
  shipmentsCountSchema,
} = require('../schemas/analytics.schema');
const {
  ordersByCustomerLocationsController,
  bestCustomersController,
  bestCaseContetsController,
  bestTrucksController,
  bestCasesController,
  deliveryAtTimeController,
  shipmentsCountController,
  lateDeliveriesController,
  inventoryTurnoverController,
  stockRotationController,
  bestCustomersLocationController,
} = require('../controllers/analytics.controller');

const router = express.Router();

router.post(
  '/orders-by-customer-locations',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(ordersByCustomerLocations, 'body'),
  ordersByCustomerLocationsController
);

router.get(
  '/best-customers',
  passport.authenticate('jwt', { session: false }),
  bestCustomersController
);

router.get(
  '/best-customers-location',
  passport.authenticate('jwt', { session: false }),
  bestCustomersLocationController
);

router.get(
  '/best-case-contents',
  passport.authenticate('jwt', { session: false }),
  bestCaseContetsController
);

router.get(
  '/best-cases',
  passport.authenticate('jwt', { session: false }),
  bestCasesController
);

router.get(
  '/best-trucks',
  passport.authenticate('jwt', { session: false }),
  bestTrucksController
);

router.get(
  '/delivery-at-time',
  passport.authenticate('jwt', { session: false }),
  deliveryAtTimeController
);

router.get(
  '/shipments-count',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(shipmentsCountSchema, 'query'),
  shipmentsCountController
);

router.get(
  '/late-deliveries',
  passport.authenticate('jwt', { session: false }),
  lateDeliveriesController
);

router.get(
  '/inventory-turnover',
  passport.authenticate('jwt', { session: false }),
  inventoryTurnoverController
);

router.get(
  '/stock-rotation',
  passport.authenticate('jwt', { session: false }),
  stockRotationController
);

module.exports = router;
