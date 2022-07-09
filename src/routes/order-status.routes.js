const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderStatusSchema,
  updateOrderStatusSchema,
  createOrderStatusSchema,
} = require('../schemas/order-status.schema');
const {
  getOrderStatusController,
  getOrderStatusByIdController,
  updateOrderStatusController,
  destroyOrderStatusController,
  createOrderStatusController,
} = require('../controllers/order-status.controller');

const router = express.Router();

// Get All Users
router.get('/', getOrderStatusController);

// Get One User
router.get(
  '/:id',
  validatorHandler(getOrderStatusSchema, 'params'),
  getOrderStatusByIdController
);

router.post(
  '/',
  validatorHandler(createOrderStatusSchema, 'body'),
  createOrderStatusController
);

// Update User
router.patch(
  '/:id',
  validatorHandler(getOrderStatusSchema, 'params'),
  validatorHandler(updateOrderStatusSchema, 'body'),
  updateOrderStatusController
);

// Delete User
router.delete(
  '/:id',
  validatorHandler(getOrderStatusSchema, 'params'),
  destroyOrderStatusController
);

module.exports = router;
