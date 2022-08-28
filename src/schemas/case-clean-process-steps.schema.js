const Joi = require('joi');
const { id: cleanProcessOrderId } = require('./clean-process-order.schema');
const { id: processStepId } = require('./process-steps.schema');

const id = Joi.number().integer();
const order = Joi.number().integer();

const getCaseCleanProcessStepSchema = Joi.object({
  id: id.required(),
});

const createCaseCleanProcessStepSchema = Joi.object({
  order: order.required(),
  cleanProcessOrderId: cleanProcessOrderId.required(),
  processStepId: processStepId.map((rule) => rule.required()),
});

const updateCaseCleanProcessStepSchema = Joi.object({
  order,
  cleanProcessOrderId,
  processStepId,
});

module.exports = {
  getCaseCleanProcessStepSchema,
  createCaseCleanProcessStepSchema,
  updateCaseCleanProcessStepSchema,
  id,
  order,
};
