const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCaseContentSchema,
  updateCaseContentSchema,
  createCaseContentSchema,
} = require('../schemas/case-content.schema');
const {
  getCaseContentsController,
  getCaseContentByIdController,
  updateCaseContentController,
  destroyCaseContentController,
  createCaseContentController,
} = require('../controllers/case-content.controller');

const router = express.Router();

// Get All Case Contents
router.get('/', getCaseContentsController);

// Get One Case Content
router.get(
  '/:id',
  validatorHandler(getCaseContentSchema, 'params'),
  getCaseContentByIdController
);

router.post(
  '/',
  validatorHandler(createCaseContentSchema, 'body'),
  createCaseContentController
);

// Update Case Content
router.patch(
  '/:id',
  validatorHandler(getCaseContentSchema, 'params'),
  validatorHandler(updateCaseContentSchema, 'body'),
  updateCaseContentController
);

// Delete Case Content
router.delete(
  '/:id',
  validatorHandler(getCaseContentSchema, 'params'),
  destroyCaseContentController
);


module.exports = router;
