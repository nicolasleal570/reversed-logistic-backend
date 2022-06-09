const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const volume = Joi.string();
const weight = Joi.string();

const getCaseSchema = Joi.object({
  id: id.required(),
});

const createCaseSchema = Joi.object({
  name: name.required(),
  description: description,
  volume: volume.required(),
  weight: weight.required(),
});

const updateCaseSchema = Joi.object({
  name,
  description,
  volume,
  weight,
});

module.exports = {
  getCaseSchema,
  createCaseSchema,
  updateCaseSchema,
  id,
  name,
  description,
  volume,
  weight,
};
