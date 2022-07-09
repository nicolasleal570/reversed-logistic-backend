const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const price = Joi.number();
const tax = Joi.number();

const getCaseContentSchema = Joi.object({
  id: id.required(),
});

const createCaseContentSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  tax,
});

const updateCaseContentSchema = Joi.object({
  name,
  description,
  price,
  tax
});

module.exports = {
  getCaseContentSchema,
  createCaseContentSchema,
  updateCaseContentSchema,
  id,
  name,
  description,
  price,
  tax
};
