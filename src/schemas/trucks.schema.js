const Joi = require('joi');
const { id: userId } = require('./user.schema');

const id = Joi.number().integer();
const licensePlate = Joi.string();
const brand = Joi.string();
const model = Joi.string();
const type = Joi.string();
const capacity = Joi.string();

const getTruckSchema = Joi.object({
  id: id.required(),
});

const createTruckSchema = Joi.object({
  brand: brand.required(),
  model: model.required(),
  licensePlate: licensePlate.required(),
  userId: userId.required(),
  type,
  capacity,
});

const updateTruckSchema = Joi.object({
  brand,
  model,
  licensePlate,
  userId,
  type,
  capacity,
});
module.exports = {
  getTruckSchema,
  createTruckSchema,
  updateTruckSchema,
  id,
  licensePlate,
  userId,
  capacity,
};
