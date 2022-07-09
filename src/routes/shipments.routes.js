const express = require('express');
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
  validatorHandler(createShipmentSchema, 'body'),
  createShipmentController
);

router.patch(
  '/:id',
  validatorHandler(getShipmentSchema, 'params'),
  validatorHandler(updateShipmentSchema, 'body'),
  updateShipmentController
);

router.delete(
  '/:id',
  validatorHandler(getShipmentSchema, 'params'),
  destroyShipmentController
);

module.exports = router;
