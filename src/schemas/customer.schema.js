const Joi = require('joi');

const id = Joi.number().integer();
const companyName = Joi.string();
const rif = Joi.string();
const description = Joi.string();
const website = Joi.string();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  companyName: companyName.required(),
  rif: rif.required(),
  description,
  website,
});

const updateCustomerSchema = Joi.object({
  companyName,
  rif,
  description,
  website,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  id,
  companyName,
  rif,
  description,
  website,
};
