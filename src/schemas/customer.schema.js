const Joi = require('joi');
const {
  name,
  line1,
  line2,
  zipCode,
  city,
  state,
  contact,
  email,
  country,
} = require('./customer-location.schema');

const id = Joi.number().integer();
const companyName = Joi.string();
const rif = Joi.string();
const description = Joi.string();
const website = Joi.string();

const locationItem = Joi.object().keys({
  id: id.min(0).allow(null).allow(''),
  name: name.required(),
  line1: line1.required(),
  line2,
  zipCode: zipCode.required(),
  city: city.required(),
  state: state.required(),
  contact: contact.required(),
  email: email.required(),
  country,
});

const locations = Joi.array().items(locationItem);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  companyName: companyName.required(),
  rif: rif.required(),
  description,
  website,
});

const createCustomerWithLocationsSchema = Joi.object({
  companyName: companyName.required(),
  rif: rif.required(),
  description,
  website,
  locations: locations.required(),
});

const updateCustomerSchema = Joi.object({
  companyName,
  rif,
  description,
  website,
});

const updateCustomerWithLocationsSchema = Joi.object({
  companyName,
  rif,
  description,
  website,
  locations,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  createCustomerWithLocationsSchema,
  updateCustomerSchema,
  updateCustomerWithLocationsSchema,
  id,
  companyName,
  rif,
  description,
  website,
};
