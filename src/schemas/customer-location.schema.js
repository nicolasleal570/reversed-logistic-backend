const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const line1 = Joi.string();
const line2 = Joi.string();
const zipCode = Joi.string();
const city = Joi.string();
const state = Joi.string();
const country = Joi.string();
const contact = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const customerId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const getCustomerLocationByCustomerIdSchema = Joi.object({
  customerId: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  line1: line1.required(),
  line2,
  zipCode: zipCode.required(),
  city: city.required(),
  state: state.required(),
  country,
  contact: contact.required(),
  email: email.required(),
  password,
  customerId: customerId.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  line1,
  line2,
  zipCode,
  city,
  state,
  country,
  contact,
  email,
  customerId,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerLocationByCustomerIdSchema,
  id,
  name,
  line1,
  line2,
  zipCode,
  city,
  state,
  country,
  contact,
  email,
  password,
  customerId,
};
