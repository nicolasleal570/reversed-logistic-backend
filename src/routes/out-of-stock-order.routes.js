const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOutOfStockOrderSchema,
  updateOutOfStockOrderSchema,
  createOutOfStockOrderSchema,
} = require('../schemas/out-of-stock-order.schema');
const {
  getOutOfStockOrderController,
  getOutOfStockOrderByIdController,
  updateOutOfStockOrderController,
  destroyOutOfStockOrderController,
  createOutOfStockOrderController,
  takeOutOfStockOrderController,
  finishOutOfStockOrderController,
} = require('../controllers/out-of-stock-order.controller');

const router = express.Router();

router.get('/', getOutOfStockOrderController);

router.get(
  '/:id',
  validatorHandler(getOutOfStockOrderSchema, 'params'),
  getOutOfStockOrderByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOutOfStockOrderSchema, 'body'),
  createOutOfStockOrderController
);

router.patch(
  '/:id',
  validatorHandler(getOutOfStockOrderSchema, 'params'),
  validatorHandler(updateOutOfStockOrderSchema, 'body'),
  updateOutOfStockOrderController
);

router.delete(
  '/:id',
  validatorHandler(getOutOfStockOrderSchema, 'params'),
  destroyOutOfStockOrderController
);

router.post(
  '/take-order',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOutOfStockOrderSchema, 'body'),
  takeOutOfStockOrderController
);

router.post(
  '/finish',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOutOfStockOrderSchema, 'body'),
  finishOutOfStockOrderController
);

module.exports = router;
