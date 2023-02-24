const Joi = require('joi');
const { id: roleId } = require('./roles.schema');

const id = Joi.number().integer();
const fullName = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const phone = Joi.string();

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  fullName: fullName.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
  roleId,
});

const updateUserSchema = Joi.object({
  fullName,
  phone,
});

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  id,
  fullName,
  email,
  password,
  phone,
};
