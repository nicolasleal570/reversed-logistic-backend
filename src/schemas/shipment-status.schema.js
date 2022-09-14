const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string().min(0).allow('').allow(null);
const value = Joi.string();
const createdById = Joi.number().integer();

const getShipmentStatusSchema = Joi.object({
  id: id.required(),
});

const createShipmentStatusSchema = Joi.object({
  name: name.required(),
  description: description,
  value: value.required(),
  createdById: createdById.required(),
});

const updateShipmentStatusSchema = Joi.object({
  name,
  description,
});

module.exports = {
  getShipmentStatusSchema,
  createShipmentStatusSchema,
  updateShipmentStatusSchema,
  id,
  name,
  description,
  value,
};
