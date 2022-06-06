const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getRoleSchema,
  updateRoleSchema,
  createRoleSchema,
} = require('../schemas/roles.schema');
const {
  getRolesController,
  getRoleByIdController,
  updateRoleController,
  destroyRoleController,
  createRoleController,
} = require('../controllers/roles.controller');

const router = express.Router();

// Get All Users
router.get('/', getRolesController);

// Get One User
router.get(
  '/:id',
  validatorHandler(getRoleSchema, 'params'),
  getRoleByIdController
);

router.post(
  '/',
  validatorHandler(createRoleSchema, 'body'),
  createRoleController
);

// Update User
router.patch(
  '/:id',
  validatorHandler(getRoleSchema, 'params'),
  validatorHandler(updateRoleSchema, 'body'),
  updateRoleController
);

// Delete User
router.delete(
  '/:id',
  validatorHandler(getRoleSchema, 'params'),
  destroyRoleController
);

module.exports = router;
