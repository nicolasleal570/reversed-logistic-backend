const Joi = require('joi');
const { caseId, caseContentId, quantity } = require('./order-items.schema');
const { id: shipmentId } = require('./shipments.schema');

const id = Joi.number().integer();
const subTotal = Joi.number();
const tax = Joi.number();
const total = Joi.number();
const customerLocationId = Joi.number().integer();
const orderStatusId = Joi.number().integer();
const createdById = Joi.number().integer();
const expectedDeliveryDate = Joi.date().allow(null).allow('');
const deliveredAt = Joi.date().allow(null).allow('');

const orderItem = Joi.object().keys({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  quantity: quantity.required(),
});

const updateOrderItem = Joi.object().keys({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  quantity: quantity.required(),
  id: id.allow(''),
});

const items = Joi.array().items(orderItem);
const updateItems = Joi.array().items(updateOrderItem);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  subTotal,
  tax,
  total,
  customerLocationId: customerLocationId.required(),
  orderStatusId,
  createdById,
  items: items.required(),
  expectedDeliveryDate: expectedDeliveryDate.required(),
  deliveredAt,
});

const updateOrderSchema = Joi.object({
  subTotal,
  tax,
  total,
  customerLocationId,
  orderStatusId,
  items: updateItems,
  expectedDeliveryDate,
  deliveredAt,
});

const takeOrderSchema = Joi.object({
  orderId: id.required(),
});

const markOrderAsReadySchema = Joi.object({
  orderId: id.required(),
});

const assignShipmentSchema = Joi.object({
  orderId: id.required(),
  shipmentId: shipmentId.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  id,
  subTotal,
  tax,
  total,
  expectedDeliveryDate,
  deliveredAt,
  customerLocationId,
  orderStatusId,
  createdById,
  takeOrderSchema,
  markOrderAsReadySchema,
  assignShipmentSchema,
};
