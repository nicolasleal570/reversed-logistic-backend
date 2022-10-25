const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCaseSchema,
  updateCaseSchema,
  createCaseSchema,
  handleCaseStateAfterPickupDoneSchema,
} = require('../schemas/cases.schema');
const {
  getCasesController,
  getCaseByIdController,
  getCasesByCustomerController,
  createCaseController,
  updateCaseController,
  destroyCaseController,
  getCasesWaitingCleanProcessController,
  getCaseLastOutOfStockInfo,
  handleCaseStateAfterPickupDoneController,
  recoverCaseController,
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

router.get(
  '/:id/out-of-stock',
  validatorHandler(getCaseSchema, 'params'),
  getCaseLastOutOfStockInfo
);

// Create new case
router.post(
  '/',
  validatorHandler(createCaseSchema, 'body'),
  createCaseController
);

router.post(
  '/:id/after-out-of-stock',
  validatorHandler(getCaseSchema, 'params'),
  validatorHandler(handleCaseStateAfterPickupDoneSchema, 'body'),
  handleCaseStateAfterPickupDoneController
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

router.post(
  '/:id/recover',
  validatorHandler(getCaseSchema, 'params'),
  recoverCaseController
);

module.exports = router;
