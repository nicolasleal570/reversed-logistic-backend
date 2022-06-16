const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCaseProcessSchema,
  updateCaseProcessSchema,
  createCaseProcessSchema,
} = require('../schemas/case-process.schema');
const {
  getCaseProcessController,
  getCaseProcessByIdController,
  updateCaseProcessController,
  destroyCaseProcessController,
  createCaseProcessController,
} = require('../controllers/case-process.controller');

const router = express.Router();

// Get All Case Processes
router.get('/', getCaseProcessController);

// Get One Case Process
router.get(
  '/:id',
  validatorHandler(getCaseProcessSchema, 'params'),
  getCaseProcessByIdController
);

router.post(
  '/',
  validatorHandler(createCaseProcessSchema, 'body'),
  createCaseProcessController
);

// Update Case Process
router.patch(
  '/:id',
  validatorHandler(getCaseProcessSchema, 'params'),
  validatorHandler(updateCaseProcessSchema, 'body'),
  updateCaseProcessController
);

// Delete Case Process
router.delete(
  '/:id',
  validatorHandler(getCaseProcessSchema, 'params'),
  destroyCaseProcessController
);

module.exports = router;
