const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCountAvailableCasesTimesSchema,
} = require('../schemas/cases-status-logs.schema');
const {
  getCountAvailableCasesTimesController,
} = require('../controllers/cases-status-logs.controller');

const router = express.Router();

router.get(
  '/available-cases-times/:caseId',
  validatorHandler(getCountAvailableCasesTimesSchema, 'params'),
  getCountAvailableCasesTimesController
);

module.exports = router;
