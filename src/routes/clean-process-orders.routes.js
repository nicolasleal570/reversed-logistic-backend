const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCleanProcessOrderSchema,
  updateCleanProcessOrderSchema,
  createCleanProcessOrderSchema,
  createFullCleanProcessOrderSchema,
} = require('../schemas/clean-process-order.schema');
const {
  getCleanProcessOrdersController,
  getCleanProcessOrderByIdController,
  updateCleanProcessOrderController,
  destroyCleanProcessOrderController,
  createCleanProcessOrderController,
  createFullCleanProcessOrderController,
} = require('../controllers/clean-process-order.controller');

const router = express.Router();

router.get('/', getCleanProcessOrdersController);

router.get(
  '/:id',
  validatorHandler(getCleanProcessOrderSchema, 'params'),
  getCleanProcessOrderByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCleanProcessOrderSchema, 'body'),
  createCleanProcessOrderController
);

router.post(
  '/full',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createFullCleanProcessOrderSchema, 'body'),
  createFullCleanProcessOrderController
);

router.patch(
  '/:id',
  validatorHandler(getCleanProcessOrderSchema, 'params'),
  validatorHandler(updateCleanProcessOrderSchema, 'body'),
  updateCleanProcessOrderController
);

router.delete(
  '/:id',
  validatorHandler(getCleanProcessOrderSchema, 'params'),
  destroyCleanProcessOrderController
);

module.exports = router;
