const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema, updateUserSchema } = require('../schemas/user.schema');
const {
  getUsersController,
  getUserByIdController,
  updateUserController,
  destroyUserController,
} = require('../controllers/user.controller');

const router = express.Router();

// Get All Users
router.get('/', getUsersController);

// Get One User
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  getUserByIdController
);

// Update User
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUserController
);

// Delete User
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  destroyUserController
);

module.exports = router;
