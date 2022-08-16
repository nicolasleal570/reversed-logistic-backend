const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCustomerSchema,
  updateCustomerSchema,
  createCustomerSchema,
  createCustomerWithLocationsSchema,
  updateCustomerWithLocationsSchema,
} = require('../schemas/customer.schema');
const {
  getCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  destroyCustomerController,
  createCustomerController,
  createCustomerWithLocationsController,
  updateCustomerWithLocationsController,
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

router.post(
  '/locations',
  validatorHandler(createCustomerWithLocationsSchema, 'body'),
  createCustomerWithLocationsController
);

// Update Customer
router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  updateCustomerController
);

router.patch(
  '/locations/:customerId',
  validatorHandler(updateCustomerWithLocationsSchema, 'body'),
  updateCustomerWithLocationsController
);

// Delete Customer
router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  destroyCustomerController
);

module.exports = router;
