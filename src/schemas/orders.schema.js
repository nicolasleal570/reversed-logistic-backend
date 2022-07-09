const Joi = require('joi');
const { caseId, caseContentId, quantity } = require('./order-items.schema');

const id = Joi.number().integer();
const subTotal = Joi.number();
const tax = Joi.number();
const total = Joi.number();
const customerLocationId = Joi.number().integer();
const orderStatusId = Joi.number().integer();
const createdById = Joi.number().integer();

const orderItem = Joi.object().keys({
  caseId: caseId.required(),
  caseContentId: caseContentId.required(),
  quantity: quantity.required(),
});

const items = Joi.array().items(orderItem);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  id,
  subTotal,
  tax,
  total,
  customerLocationId,
  orderStatusId,
  createdById,
  items: items.required(),
});

const updateOrderSchema = Joi.object({
  id,
  subTotal,
  tax,
  total,
  customerLocationId,
  orderStatusId,
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  id,
  subTotal,
  tax,
  total,
  customerLocationId,
  orderStatusId,
  createdById,
};
