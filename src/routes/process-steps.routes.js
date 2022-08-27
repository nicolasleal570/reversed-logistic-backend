const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getProcessStepSchema,
  updateProcessStepSchema,
  createProcessStepSchema,
} = require('../schemas/process-steps.schema');
const {
  getProcessStepsController,
  getProcessStepByIdController,
  updateProcessStepController,
  destroyProcessStepController,
  createProcessStepController,
} = require('../controllers/process-steps.controller');

const router = express.Router();

router.get('/', getProcessStepsController);

router.get(
  '/:id',
  validatorHandler(getProcessStepSchema, 'params'),
  getProcessStepByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProcessStepSchema, 'body'),
  createProcessStepController
);

router.patch(
  '/:id',
  validatorHandler(getProcessStepSchema, 'params'),
  validatorHandler(updateProcessStepSchema, 'body'),
  updateProcessStepController
);

router.delete(
  '/:id',
  validatorHandler(getProcessStepSchema, 'params'),
  destroyProcessStepController
);

module.exports = router;
