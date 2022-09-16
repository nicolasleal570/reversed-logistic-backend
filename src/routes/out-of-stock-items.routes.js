const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOutOfStockItemSchema,
  updateOutOfStockItemSchema,
  createOutOfStockItemSchema,
} = require('../schemas/out-of-stock-items.schema');
const {
  getOutOfStockItemsController,
  getOutOfStockItemByIdController,
  updateOutOfStockItemController,
  destroyOutOfStockItemController,
  createOutOfStockItemController,
} = require('../controllers/out-of-stock-items.controller');

const router = express.Router();

router.get('/', getOutOfStockItemsController);

router.get(
  '/:id',
  validatorHandler(getOutOfStockItemSchema, 'params'),
  getOutOfStockItemByIdController
);

router.post(
  '/',
  validatorHandler(createOutOfStockItemSchema, 'body'),
  createOutOfStockItemController
);

// Update User
router.patch(
  '/:id',
  validatorHandler(getOutOfStockItemSchema, 'params'),
  validatorHandler(updateOutOfStockItemSchema, 'body'),
  updateOutOfStockItemController
);

// Delete User
router.delete(
  '/:id',
  validatorHandler(getOutOfStockItemSchema, 'params'),
  destroyOutOfStockItemController
);

module.exports = router;
