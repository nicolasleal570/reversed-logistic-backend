const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getShipmentSchema,
  updateShipmentSchema,
  createShipmentSchema,
} = require('../schemas/shipments.schema');
const {
  getShipmentsController,
  getShipmentByIdController,
  updateShipmentController,
  destroyShipmentController,
  createShipmentController,
  startShipmentController,
} = require('../controllers/shipments.controller');

const router = express.Router();

router.get('/', getShipmentsController);

router.get(
  '/:id',
  validatorHandler(getShipmentSchema, 'params'),
  getShipmentByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createShipmentSchema, 'body'),
  createShipmentController
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getShipmentSchema, 'params'),
  validatorHandler(updateShipmentSchema, 'body'),
  updateShipmentController
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getShipmentSchema, 'params'),
  destroyShipmentController
);

router.post(
  '/start-shipping',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getShipmentSchema, 'body'),
  startShipmentController
);

module.exports = router;
