const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCaseProcessStepSchema,
  updateCaseProcessStepSchema,
  createCaseProcessStepSchema,
} = require('../schemas/case-process-step.schema');
const {
  getCaseProcessStepsController,
  getCaseProcessStepByIdController,
  updateCaseProcessStepController,
  destroyCaseProcessStepController,
  createCaseProcessStepController,
} = require('../controllers/case-process-step.controller');

const router = express.Router();

// Get All Case Process Steps
router.get('/', getCaseProcessStepsController);

// Get One Case Process Step
router.get(
  '/:id',
  validatorHandler(getCaseProcessStepSchema, 'params'),
  getCaseProcessStepByIdController
);

router.post(
  '/',
  validatorHandler(createCaseProcessStepSchema, 'body'),
  createCaseProcessStepController
);

// Update Case Process Step
router.patch(
  '/:id',
  validatorHandler(getCaseProcessStepSchema, 'params'),
  validatorHandler(updateCaseProcessStepSchema, 'body'),
  updateCaseProcessStepController
);

// Delete Case Process Step
router.delete(
  '/:id',
  validatorHandler(getCaseProcessStepSchema, 'params'),
  destroyCaseProcessStepController
);

module.exports = router;
