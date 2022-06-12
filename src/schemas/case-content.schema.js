const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();

const getCaseContentSchema = Joi.object({
  id: id.required(),
});

const createCaseContentSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateCaseContentSchema = Joi.object({
  name,
  description,
});

module.exports = {
  getCaseContentSchema,
  createCaseContentSchema,
  updateCaseContentSchema,
  id,
  name,
  description,
};
