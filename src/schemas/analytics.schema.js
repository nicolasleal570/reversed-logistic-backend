const Joi = require('joi');
const { id: customerId } = require('./customer.schema');
const { id: driverId } = require('./user.schema');

const ordersByCustomerLocations = Joi.object({
  customerId: customerId.required(),
});

const deliveryAtTimeSchema = Joi.object({
  driverId: driverId.required(),
});

module.exports = {
  ordersByCustomerLocations,
  deliveryAtTimeSchema,
};
