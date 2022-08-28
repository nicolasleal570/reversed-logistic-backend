const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCaseCleanProcessStepSchema,
  updateCaseCleanProcessStepSchema,
  createCaseCleanProcessStepSchema,
} = require('../schemas/case-clean-process-steps.schema');
const {
  getCaseCleanProcessStepsController,
  getCaseCleanProcessStepByIdController,
  updateCaseCleanProcessStepController,
  destroyCaseCleanProcessStepController,
  createCaseCleanProcessStepController,
} = require('../controllers/case-clean-process-steps.controller');

const router = express.Router();

router.get('/', getCaseCleanProcessStepsController);

router.get(
  '/:id',
  validatorHandler(getCaseCleanProcessStepSchema, 'params'),
  getCaseCleanProcessStepByIdController
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCaseCleanProcessStepSchema, 'body'),
  createCaseCleanProcessStepController
);

router.patch(
  '/:id',
  validatorHandler(getCaseCleanProcessStepSchema, 'params'),
  validatorHandler(updateCaseCleanProcessStepSchema, 'body'),
  updateCaseCleanProcessStepController
);

router.delete(
  '/:id',
  validatorHandler(getCaseCleanProcessStepSchema, 'params'),
  destroyCaseCleanProcessStepController
);

module.exports = router;
