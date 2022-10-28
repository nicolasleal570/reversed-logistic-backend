const Joi = require('joi');
const { id: customerId } = require('./customer.schema');
const { id: driverId } = require('./user.schema');

const month = Joi.number().integer();

const ordersByCustomerLocations = Joi.object({
  customerId: customerId.required(),
});

const deliveryAtTimeSchema = Joi.object({
  driverId: driverId.required(),
});

const shipmentsCountSchema = Joi.object({
  month: month.required(),
});

module.exports = {
  ordersByCustomerLocations,
  deliveryAtTimeSchema,
  shipmentsCountSchema,
};
