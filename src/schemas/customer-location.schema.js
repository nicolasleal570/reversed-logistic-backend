const Joi = require('joi');

const id = Joi.number().integer();
const line1 = Joi.string();
const line2 = Joi.string();
const zipCode = Joi.string();
const city = Joi.string();
const state = Joi.string();
const country = Joi.string();
const contact = Joi.string();
const customerId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  line1: line1.required(),
  line2,
  zipCode: zipCode.required(),
  city: city.required(),
  state: state.required(),
  country,
  contact: contact.required(),
  customerId: customerId.required(),
});

const updateCustomerSchema = Joi.object({
  line1,
  line2,
  zipCode,
  city,
  state,
  country,
  contact,
  customerId,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  id,
  line1,
  line2,
  zipCode,
  city,
  state,
  country,
  contact,
  customerId,
};
