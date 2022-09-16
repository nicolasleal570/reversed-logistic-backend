const Joi = require('joi');
const { id: orderId } = require('./orders.schema');
const { id: caseId } = require('./cases.schema');
const { id: caseContentId } = require('./case-content.schema');
const { id: outOfStockOrderId } = require('./out-of-stock-order.schema');

const id = Joi.number().integer();

const getOutOfStockItemSchema = Joi.object({
  id: id.required(),
});

const createOutOfStockItemSchema = Joi.object({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  orderId: orderId.required(),
  outOfStockOrderId: outOfStockOrderId.required(),
});

const updateOutOfStockItemSchema = Joi.object({
  caseId,
  caseContentId,
  orderId,
  outOfStockOrderId,
});

module.exports = {
  getOutOfStockItemSchema,
  createOutOfStockItemSchema,
  updateOutOfStockItemSchema,
  id,
};
