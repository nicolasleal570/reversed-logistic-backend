const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getShipmentStatusSchema,
  updateShipmentStatusSchema,
  createShipmentStatusSchema,
} = require('../schemas/shipment-status.schema');
const {
  getShipmentStatusController,
  getShipmentStatusByIdController,
  updateShipmentStatusController,
  destroyShipmentStatusController,
  createShipmentStatusController,
} = require('../controllers/shipment-status.controller');

const router = express.Router();

router.get('/', getShipmentStatusController);

router.get(
  '/:id',
  validatorHandler(getShipmentStatusSchema, 'params'),
  getShipmentStatusByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createShipmentStatusSchema, 'body'),
  createShipmentStatusController
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getShipmentStatusSchema, 'params'),
  validatorHandler(updateShipmentStatusSchema, 'body'),
  updateShipmentStatusController
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getShipmentStatusSchema, 'params'),
  destroyShipmentStatusController
);

module.exports = router;
