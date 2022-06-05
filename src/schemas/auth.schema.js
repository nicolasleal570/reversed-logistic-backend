const Joi = require('joi');
const { email, password } = require('./user.schema');

const token = Joi.string();

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryUserSchema = Joi.object({
  email: email.required(),
});

const changePasswordUserSchema = Joi.object({
  newPassword: password.required(),
  token: token.required(),
});

module.exports = {
  loginUserSchema,
  recoveryUserSchema,
  changePasswordUserSchema,
};
