const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const value = Joi.string();
const createdById = Joi.number().integer();
const roleId = Joi.number().integer();
const permissionId = Joi.number().integer();

const getRoleSchema = Joi.object({
  id: id.required(),
});

const createRoleSchema = Joi.object({
  name: name.required(),
  description: description,
  value: value.required(),
  createdById: createdById.required(),
});

const updateRoleSchema = Joi.object({
  name,
  description,
});

const appendPermissionToRoleSchema = Joi.object({
  roleId: roleId.required(),
  permissionId: permissionId.required(),
});

module.exports = {
  getRoleSchema,
  createRoleSchema,
  updateRoleSchema,
  appendPermissionToRoleSchema,
  id,
  name,
  description,
  value,
};
