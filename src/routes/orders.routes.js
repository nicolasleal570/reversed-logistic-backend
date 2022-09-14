const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderSchema,
  updateOrderSchema,
  createOrderSchema,
  takeOrderSchema,
  markOrderAsReadySchema,
  assignShipmentSchema,
} = require('../schemas/orders.schema');
const {
  getOrdersController,
  getOrderByIdController,
  updateOrderController,
  destroyOrderController,
  createOrderController,
  takeOrderController,
  markOrderAsReadyController,
  assignShipmentController,
} = require('../controllers/orders.controller');

const router = express.Router();

router.get('/', getOrdersController);

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  getOrderByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  createOrderController
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  updateOrderController
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  destroyOrderController
);

router.post(
  '/take',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(takeOrderSchema, 'body'),
  takeOrderController
);

router.post(
  '/done',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(markOrderAsReadySchema, 'body'),
  markOrderAsReadyController
);

router.post(
  '/assign-shipment',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(assignShipmentSchema, 'body'),
  assignShipmentController
);

module.exports = router;
