const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const value = Joi.string();
const createdById = Joi.number().integer();
const nextProcessStepId = Joi.number().integer();

const getCaseProcessStepSchema = Joi.object({
  id: id.required(),
});

const createCaseProcessStepSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  value: value.required(),
  createdById: createdById.required(),
  nextProcessStepId,
});

const updateCaseProcessStepSchema = Joi.object({
  name,
  description,
  nextProcessStepId
});

module.exports = {
  getCaseProcessStepSchema,
  createCaseProcessStepSchema,
  updateCaseProcessStepSchema,
  id,
  name,
  description,
  value,
  createdById,
  nextProcessStepId,
};
