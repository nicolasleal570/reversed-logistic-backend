const Joi = require('joi');

const SET_DIRTY = 'SET_DIRTY';
const SET_AVAILABLE = 'SET_AVAILABLE';

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const state = Joi.string();
const volume = Joi.number().integer();
const weight = Joi.number().integer();

const getCaseSchema = Joi.object({
  id: id.required(),
});

const createCaseSchema = Joi.object({
  name: name.required(),
  description: description.default(''),
  volume: volume.required(),
  weight: weight.required(),
  state,
});

const updateCaseSchema = Joi.object({
  name,
  description,
  volume,
  weight,
  state,
});

const handleCaseStateAfterPickupDoneSchema = Joi.object({
  currentStatus: Joi.string().valid(SET_DIRTY, SET_AVAILABLE).required(),
  outOfStockItemId: id.required(),
});

module.exports = {
  getCaseSchema,
  createCaseSchema,
  updateCaseSchema,
  handleCaseStateAfterPickupDoneSchema,
  id,
  name,
  description,
  volume,
  weight,
};
