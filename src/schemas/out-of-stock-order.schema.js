const Joi = require('joi');
const { id: customerLocationId } = require('./customer-location.schema');
const { id: statusId } = require('./out-of-stock-status.schema');
const { id: caseId } = require('./cases.schema');
const { id: caseContentId } = require('./case-content.schema');
const { id: orderId } = require('./orders.schema');

const id = Joi.number().integer();
const assignedToId = Joi.number().integer();
const pickedUpAt = Joi.date().min(0).allow(null).allow('');
const doneAt = Joi.date().min(0).allow(null).allow('');

const item = Joi.object().keys({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  orderId: orderId.required(),
});

const updateItem = Joi.object().keys({
  id: id.allow(''),
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  orderId: orderId.required(),
});

const items = Joi.array().items(item);
const updateItems = Joi.array().items(updateItem);

const getOutOfStockOrderSchema = Joi.object({
  id: id.required(),
});

const createOutOfStockOrderSchema = Joi.object({
  customerLocationId: customerLocationId.required(),
  items: items.required(),
});

const updateOutOfStockOrderSchema = Joi.object({
  customerLocationId,
  statusId,
  assignedToId,
  pickedUpAt,
  doneAt,
  items: updateItems,
});

module.exports = {
  getOutOfStockOrderSchema,
  createOutOfStockOrderSchema,
  updateOutOfStockOrderSchema,
  id,
  statusId,
  pickedUpAt,
  doneAt,
};
