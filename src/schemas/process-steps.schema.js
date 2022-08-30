const Joi = require('joi');

const id = [Joi.number().integer(), Joi.string()];
const name = Joi.string();
const description = Joi.string();
const instructions = Joi.string();
const guidelines = Joi.string();

const getProcessStepSchema = Joi.object({
  id: id.map((rule) => rule.required()),
});

const createProcessStepSchema = Joi.object({
  name: name.required(),
  description: description,
  instructions: instructions.required(),
  guidelines: guidelines.required(),
});

const updateProcessStepSchema = Joi.object({
  name,
  description,
  instructions,
  guidelines,
});

module.exports = {
  getProcessStepSchema,
  createProcessStepSchema,
  updateProcessStepSchema,
  id,
  name,
  description,
  instructions,
  guidelines,
};
