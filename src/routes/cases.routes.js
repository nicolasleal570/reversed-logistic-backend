const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCaseSchema,
  updateCaseSchema,
  createCaseSchema,
} = require('../schemas/cases.schema');
const {
  getCasesController,
  getCaseByIdController,
  getCasesByCustomerController,
  createCaseController,
  updateCaseController,
  destroyCaseController,
  getCasesWaitingCleanProcessController,
} = require('../controllers/cases.controller');

const router = express.Router();

// Get All Cases
router.get('/', getCasesController);

router.get(
  '/cases-by-customer',
  passport.authenticate('jwt', { session: false }),
  getCasesByCustomerController
);

router.get(
  '/waiting-clean-process',
  passport.authenticate('jwt', { session: false }),
  getCasesWaitingCleanProcessController
);

// Get One Case
router.get(
  '/:id',
  validatorHandler(getCaseSchema, 'params'),
  getCaseByIdController
);

// Create new case
router.post(
  '/',
  validatorHandler(createCaseSchema, 'body'),
  createCaseController
);

// Update Case
router.patch(
  '/:id',
  validatorHandler(getCaseSchema, 'params'),
  validatorHandler(updateCaseSchema, 'body'),
  updateCaseController
);

// Delete Case
router.delete(
  '/:id',
  validatorHandler(getCaseSchema, 'params'),
  destroyCaseController
);

module.exports = router;
