const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const value = Joi.string();
const createdById = [Joi.number().integer(), Joi.string()];
const roleId = Joi.number().integer();
const permissionId = Joi.number().integer();
const userId = Joi.number().integer();

const getRoleSchema = Joi.object({
  id: id.required(),
});

const createRoleSchema = Joi.object({
  name: name.required(),
  description: description,
  createdById: createdById.map((object) => object.required()),
});

const updateRoleSchema = Joi.object({
  name,
  description,
});

const appendPermissionToRoleSchema = Joi.object({
  roleId: roleId.required(),
  permissionId: permissionId.required(),
});

const appendRoleToUserSchema = Joi.object({
  roleId: roleId.required(),
  userId: userId.required(),
});

module.exports = {
  getRoleSchema,
  createRoleSchema,
  updateRoleSchema,
  appendPermissionToRoleSchema,
  appendRoleToUserSchema,
  id,
  name,
  description,
  value,
};
