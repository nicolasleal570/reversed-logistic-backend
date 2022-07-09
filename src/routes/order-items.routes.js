const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderItemSchema,
  updateOrderItemSchema,
  createOrderItemSchema,
} = require('../schemas/order-items.schema');
const {
  getOrderItemsController,
  getOrderItemByIdController,
  updateOrderItemController,
  destroyOrderItemController,
  createOrderItemController,
} = require('../controllers/order-item.controller');

const router = express.Router();

router.get('/', getOrderItemsController);

router.get(
  '/:id',
  validatorHandler(getOrderItemSchema, 'params'),
  getOrderItemByIdController
);

router.post(
  '/',
  validatorHandler(createOrderItemSchema, 'body'),
  createOrderItemController
);

// Update User
router.patch(
  '/:id',
  validatorHandler(getOrderItemSchema, 'params'),
  validatorHandler(updateOrderItemSchema, 'body'),
  updateOrderItemController
);

// Delete User
router.delete(
  '/:id',
  validatorHandler(getOrderItemSchema, 'params'),
  destroyOrderItemController
);

module.exports = router;
