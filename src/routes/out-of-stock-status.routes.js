const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOutOfStockStatusSchema,
  updateOutOfStockStatusSchema,
  createOutOfStockStatusSchema,
} = require('../schemas/out-of-stock-status.schema');
const {
  getOutOfStockStatusController,
  getOutOfStockStatusByIdController,
  updateOutOfStockStatusController,
  destroyOutOfStockStatusController,
  createOutOfStockStatusController,
} = require('../controllers/out-of-stock-status.controller');

const router = express.Router();

router.get('/', getOutOfStockStatusController);

router.get(
  '/:id',
  validatorHandler(getOutOfStockStatusSchema, 'params'),
  getOutOfStockStatusByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOutOfStockStatusSchema, 'body'),
  createOutOfStockStatusController
);

router.patch(
  '/:id',
  validatorHandler(getOutOfStockStatusSchema, 'params'),
  validatorHandler(updateOutOfStockStatusSchema, 'body'),
  updateOutOfStockStatusController
);

router.delete(
  '/:id',
  validatorHandler(getOutOfStockStatusSchema, 'params'),
  destroyOutOfStockStatusController
);

module.exports = router;
