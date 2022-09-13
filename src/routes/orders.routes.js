const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderSchema,
  updateOrderSchema,
  createOrderSchema,
  takeOrderSchema,
  markOrderAsReadySchema,
} = require('../schemas/orders.schema');
const {
  getOrdersController,
  getOrderByIdController,
  updateOrderController,
  destroyOrderController,
  createOrderController,
  takeOrderController,
  markOrderAsReadyController,
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
  validatorHandler(createOrderSchema, 'body'),
  createOrderController
);

router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  updateOrderController
);

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  destroyOrderController
);

router.post(
  '/take',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(takeOrderSchema, 'params'),
  takeOrderController
);

router.post(
  '/done',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(markOrderAsReadySchema, 'params'),
  markOrderAsReadyController
);

module.exports = router;
