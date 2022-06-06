const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getPermissionSchema,
  updatePermissionSchema,
  createPermissionSchema,
} = require('../schemas/permissions.schema');
const {
  getPermissionsController,
  getPermissionByIdController,
  createPermissionController,
  updatePermissionController,
  destroyPermissionController,
} = require('../controllers/permissions.controller');

const router = express.Router();

// Get All Users
router.get('/', getPermissionsController);

// Get One User
router.get(
  '/:id',
  validatorHandler(getPermissionSchema, 'params'),
  getPermissionByIdController
);

router.post(
  '/',
  validatorHandler(createPermissionSchema, 'body'),
  createPermissionController
);

// Update User
router.patch(
  '/:id',
  validatorHandler(getPermissionSchema, 'params'),
  validatorHandler(updatePermissionSchema, 'body'),
  updatePermissionController
);

// Delete User
router.delete(
  '/:id',
  validatorHandler(getPermissionSchema, 'params'),
  destroyPermissionController
);

module.exports = router;
