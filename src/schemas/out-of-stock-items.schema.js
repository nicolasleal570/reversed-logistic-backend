const Joi = require('joi');
const { id: orderId } = require('./orders.schema');
const { id: caseId } = require('./cases.schema');
const { id: caseContentId } = require('./case-content.schema');
const { id: outOfStockOrderId } = require('./out-of-stock-order.schema');

const id = Joi.number().integer();
const wasReturned = Joi.boolean();
const atWarehouse = Joi.boolean();
const needsCleanProcess = Joi.boolean();
const cleanProcessDone = Joi.boolean();
const finished = Joi.boolean();

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
  wasReturned,
  atWarehouse,
  needsCleanProcess,
  cleanProcessDone,
  finished,
});

module.exports = {
  getOutOfStockItemSchema,
  createOutOfStockItemSchema,
  updateOutOfStockItemSchema,
  id,
};
