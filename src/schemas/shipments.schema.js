const Joi = require('joi');

const id = Joi.number().integer();
const details = Joi.string().min(0).allow('').allow(null);
const createdById = Joi.number().integer();
const truckId = Joi.number().integer();
const shipmentAt = Joi.date().allow(null);
const deliveredAt = Joi.date().allow(null);

const getShipmentSchema = Joi.object({
  id: id.required(),
});

const createShipmentSchema = Joi.object({
  details,
  shipmentAt,
  truckId: createdById.required(),
});

const updateShipmentSchema = Joi.object({
  details,
  truckId,
  shipmentAt,
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
  shipmentAt,
  deliveredAt,
};
