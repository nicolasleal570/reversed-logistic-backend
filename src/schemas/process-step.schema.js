const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const value = Joi.string();
const createdById = Joi.number().integer();
const nextProcessStepId = Joi.number().integer();

const getProcessStepSchema = Joi.object({
  id: id.required(),
});

const createProcessStepSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  value: value.required(),
  createdById: createdById.required(),
  nextProcessStepId,
});

const updateProcessStepSchema = Joi.object({
  name,
  description,
  nextProcessStepId
});

module.exports = {
  getProcessStepSchema,
  createProcessStepSchema,
  updateProcessStepSchema,
  id,
  name,
  description,
  value,
  createdById,
  nextProcessStepId,
};
