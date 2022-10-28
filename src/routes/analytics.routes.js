const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  ordersByCustomerLocations,
  deliveryAtTimeSchema,
} = require('../schemas/analytics.schema');
const {
  ordersByCustomerLocationsController,
  bestCustomersController,
  bestCaseContetsController,
  bestTrucksController,
  bestCasesController,
  deliveryAtTimeController,
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
  '/delivery-at-time/:driverId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(deliveryAtTimeSchema, 'params'),
  deliveryAtTimeController
);

module.exports = router;
