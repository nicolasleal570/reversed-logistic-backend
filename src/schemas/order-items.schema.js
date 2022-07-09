const Joi = require('joi');

const id = Joi.number().integer();
const caseId = Joi.number().integer();
const caseContentId = Joi.number().integer();
const orderId = Joi.number().integer();
const quantity = Joi.number().integer();

const getOrderItemSchema = Joi.object({
  id: id.required(),
});

const createOrderItemSchema = Joi.object({
  caseId,
  caseContentId,
  orderId,
  quantity,
});

const updateOrderItemSchema = Joi.object({
  caseId,
  caseContentId,
  orderId,
  quantity,
});

module.exports = {
  getOrderItemSchema,
  createOrderItemSchema,
  updateOrderItemSchema,
  id,
  caseId,
  caseContentId,
  orderId,
  quantity,
};
