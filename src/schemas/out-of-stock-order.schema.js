const Joi = require('joi');
const { id: customerLocationId } = require('./customer-location.schema');
const { id: statusId } = require('./out-of-stock-status.schema');

const id = Joi.number().integer();
const assignedToId = Joi.number().integer();
const pickedUpAt = Joi.date().min(0).allow(null).allow('');

const getOutOfStockOrderSchema = Joi.object({
  id: id.required(),
});

const createOutOfStockOrderSchema = Joi.object({
  customerLocationId: customerLocationId.required(),
});

const updateOutOfStockOrderSchema = Joi.object({
  customerLocationId,
  statusId,
  assignedToId,
  pickedUpAt,
});

module.exports = {
  getOutOfStockOrderSchema,
  createOutOfStockOrderSchema,
  updateOutOfStockOrderSchema,
  id,
};
