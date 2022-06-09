const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getRoleSchema,
  updateRoleSchema,
  createRoleSchema,
  appendPermissionToRoleSchema,
  appendRoleToUserSchema,
} = require('../schemas/roles.schema');
const {
  getRolesController,
  getRoleByIdController,
  updateRoleController,
  destroyRoleController,
  createRoleController,
  addPermissionRoleController,
  addRoleUserController,
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

router.post(
  '/add-permission',
  validatorHandler(appendPermissionToRoleSchema, 'body'),
  addPermissionRoleController
);

router.post(
  '/append-role',
  validatorHandler(appendRoleToUserSchema, 'body'),
  addRoleUserController
);

module.exports = router;
