const Joi = require('joi');
const { id: cleanOrderProcessId } = require('./clean-order-process.schema');
const { id: processStepId } = require('./process-steps.schema');

const id = Joi.number().integer();
const order = Joi.number().integer();

const getCaseCleanProcessStepSchema = Joi.object({
  id: id.required(),
});

const createCaseCleanProcessStepSchema = Joi.object({
  order: order.required(),
  cleanOrderProcessId: cleanOrderProcessId.required(),
  processStepId: processStepId.required(),
});

const updateCaseCleanProcessStepSchema = Joi.object({
  order,
  cleanOrderProcessId,
  processStepId,
});

module.exports = {
  getCaseCleanProcessStepSchema,
  createCaseCleanProcessStepSchema,
  updateCaseCleanProcessStepSchema,
  id,
  order,
};
