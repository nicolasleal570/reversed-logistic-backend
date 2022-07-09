const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderSchema,
  updateOrderSchema,
  createOrderSchema,
  appendPermissionToOrderSchema,
  appendOrderToUserSchema,
} = require('../schemas/orders.schema');
const {
  getOrdersController,
  getOrderByIdController,
  updateOrderController,
  destroyOrderController,
  createOrderController,
  addPermissionOrderController,
  addOrderUserController,
} = require('../controllers/orders.controller');

const router = express.Router();

// Get All Users
router.get('/', getOrdersController);

// Get One User
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

// Update User
router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  updateOrderController
);

// Delete User
router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  destroyOrderController
);

module.exports = router;
