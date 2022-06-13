const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getProcessStepSchema,
  updateProcessStepSchema,
  createProcessStepSchema,
} = require('../schemas/case-process-step.schema');
const {
  getProcessStepsController,
  getProcessStepByIdController,
  updateProcessStepController,
  destroyProcessStepController,
  createProcessStepController,
} = require('../controllers/case-process-step.controller');

const router = express.Router();

// Get All Case Process Steps
router.get('/', getProcessStepsController);

// Get One Case Process Step
router.get(
  '/:id',
  validatorHandler(getProcessStepSchema, 'params'),
  getProcessStepByIdController
);

router.post(
  '/',
  validatorHandler(createProcessStepSchema, 'body'),
  createProcessStepController
);

// Update Case Process Step
router.patch(
  '/:id',
  validatorHandler(getProcessStepSchema, 'params'),
  validatorHandler(updateProcessStepSchema, 'body'),
  updateProcessStepController
);

// Delete Case Process Step
router.delete(
  '/:id',
  validatorHandler(getProcessStepSchema, 'params'),
  destroyProcessStepController
);

module.exports = router;
