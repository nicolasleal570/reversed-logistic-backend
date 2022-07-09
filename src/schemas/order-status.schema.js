const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const value = Joi.string();
const createdById = Joi.number().integer();

const getOrderStatusSchema = Joi.object({
  id: id.required(),
});

const createOrderStatusSchema = Joi.object({
  name: name.required(),
  description: description,
  value: value.required(),
  createdById: createdById.required(),
});

const updateOrderStatusSchema = Joi.object({
  name,
  description,
});

module.exports = {
  getOrderStatusSchema,
  createOrderStatusSchema,
  updateOrderStatusSchema,
  id,
  name,
  description,
  value,
};
