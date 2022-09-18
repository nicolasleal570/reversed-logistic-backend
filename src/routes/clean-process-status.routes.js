const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCleanProcessStatusSchema,
  updateCleanProcessStatusSchema,
  createCleanProcessStatusSchema,
} = require('../schemas/clean-process-status.schema');
const {
  getCleanProcessStatusController,
  getCleanProcessStatusByIdController,
  updateCleanProcessStatusController,
  destroyCleanProcessStatusController,
  createCleanProcessStatusController,
} = require('../controllers/clean-process-status.controller');

const router = express.Router();

router.get('/', getCleanProcessStatusController);

router.get(
  '/:id',
  validatorHandler(getCleanProcessStatusSchema, 'params'),
  getCleanProcessStatusByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCleanProcessStatusSchema, 'body'),
  createCleanProcessStatusController
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCleanProcessStatusSchema, 'params'),
  validatorHandler(updateCleanProcessStatusSchema, 'body'),
  updateCleanProcessStatusController
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCleanProcessStatusSchema, 'params'),
  destroyCleanProcessStatusController
);

module.exports = router;
