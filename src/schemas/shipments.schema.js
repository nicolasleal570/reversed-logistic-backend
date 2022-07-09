const Joi = require('joi');

const id = Joi.number().integer();
const details = Joi.string();
const createdById = Joi.number().integer();
const truckId = Joi.number().integer();
const deliveredAt = Joi.date()

const getShipmentSchema = Joi.object({
  id: id.required(),
});

const createShipmentSchema = Joi.object({
  details,
  createdById: createdById.required(),
  truckId: createdById.required(),
});

const updateShipmentSchema = Joi.object({
  details,
  createdById,
  truckId,
  deliveredAt,
});

module.exports = {
  getShipmentSchema,
  createShipmentSchema,
  updateShipmentSchema,
  id,
  details,
  createdById,
  truckId,
  deliveredAt,
};
