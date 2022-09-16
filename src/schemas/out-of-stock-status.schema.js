const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const value = Joi.string();
const createdById = Joi.number().integer();

const getOutOfStockStatusSchema = Joi.object({
  id: id.required(),
});

const createOutOfStockStatusSchema = Joi.object({
  name: name.required(),
  description: description,
  value: value.required(),
  createdById: createdById.required(),
});

const updateOutOfStockStatusSchema = Joi.object({
  name,
  description,
});

module.exports = {
  getOutOfStockStatusSchema,
  createOutOfStockStatusSchema,
  updateOutOfStockStatusSchema,
  id,
  name,
  description,
  value,
};
