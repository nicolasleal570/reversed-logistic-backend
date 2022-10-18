const Joi = require('joi');
const { id: customerId } = require('./customer.schema');

const ordersByCustomerLocations = Joi.object({
  customerId: customerId.required(),
});

module.exports = {
  ordersByCustomerLocations,
};
