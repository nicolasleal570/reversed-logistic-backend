const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string().min(0).allow('').allow(null);
const value = Joi.string();
const createdById = Joi.number().integer();

const getCleanProcessStatusSchema = Joi.object({
  id: id.required(),
});

const createCleanProcessStatusSchema = Joi.object({
  name: name.required(),
  description: description,
  value: value.required(),
  createdById: createdById.required(),
});

const updateCleanProcessStatusSchema = Joi.object({
  name,
  description,
});

module.exports = {
  getCleanProcessStatusSchema,
  createCleanProcessStatusSchema,
  updateCleanProcessStatusSchema,
  id,
  name,
  description,
  value,
};
