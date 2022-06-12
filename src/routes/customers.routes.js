const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCustomerSchema,
  updateCustomerSchema,
  createCustomerSchema,
} = require('../schemas/customer.schema');
const {
  getCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  destroyCustomerController,
  createCustomerController,
} = require('../controllers/customer.controller');

const router = express.Router();

// Get All Customers
router.get('/', getCustomersController);

// Get One Customer
router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  getCustomerByIdController
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  createCustomerController
);

// Update Customer
router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  updateCustomerController
);

// Delete Customer
router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  destroyCustomerController
);


module.exports = router;
