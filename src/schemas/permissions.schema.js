const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const value = Joi.string();
const createdById = Joi.number().integer();

const getPermissionSchema = Joi.object({
  id: id.required(),
});

const createPermissionSchema = Joi.object({
  name: name.required(),
  description: description,
  value: value.required(),
  createdById: createdById.required(),
});

const updatePermissionSchema = Joi.object({
  name,
  description,
});

module.exports = {
  getPermissionSchema,
  createPermissionSchema,
  updatePermissionSchema,
  id,
  name,
  description,
  value,
};
