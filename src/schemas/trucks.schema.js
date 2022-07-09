const Joi = require('joi');

const id = Joi.number().integer();
const licensePlate = Joi.string();
const capacity = Joi.string();
const userId = Joi.number().integer();

const getTruckSchema = Joi.object({
  id: id.required(),
});

const createTruckSchema = Joi.object({
  licensePlate: licensePlate.required(),
  userId: userId.required(),
  capacity,
});

const updateTruckSchema = Joi.object({
  licensePlate,
  userId,
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
