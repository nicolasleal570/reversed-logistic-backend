const Joi = require('joi');
const { id: caseId } = require('./cases.schema');
const { id: caseContentId } = require('./case-content.schema');
const { id: customerLocationId } = require('./customer-location.schema');
const { id: processStepId } = require('./process-steps.schema');

const id = Joi.number().integer();
const statusId = Joi.number().integer();
const details = Joi.string().min(0).allow('').allow(null);
const finishedAt = Joi.date();
const stepItem = Joi.object().keys({
  processStepId,
});
const steps = Joi.array().items(stepItem);

const getCleanProcessOrderSchema = Joi.object({
  id: id.required(),
});

const createCleanProcessOrderSchema = Joi.object({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  customerLocationId: customerLocationId.required(),
  details,
  finishedAt,
});

const createFullCleanProcessOrderSchema = Joi.object({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  customerLocationId: customerLocationId.required(),
  steps: steps.required(),
  details,
  finishedAt,
});

const updateCleanProcessOrderSchema = Joi.object({
  caseId,
  caseContentId,
  customerLocationId,
  details,
  finishedAt,
  statusId,
});

const stepDoneCleanProcessOrderSchema = Joi.object({
  stepId: caseId.required(),
});

module.exports = {
  getCleanProcessOrderSchema,
  createCleanProcessOrderSchema,
  createFullCleanProcessOrderSchema,
  updateCleanProcessOrderSchema,
  stepDoneCleanProcessOrderSchema,
  id,
  details,
  finishedAt,
};
