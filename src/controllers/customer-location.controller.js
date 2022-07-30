const CustomerLocationService = require('../services/customer-location.service');
const CustomerService = require('../services/customer.service');

const service = new CustomerLocationService();
const customerService = new CustomerService();

async function getCustomersController(_req, res, next) {
  try {
    const customers = await service.findAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
}

async function getCustomerByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function getCustomerByCustomerIdController(req, res, next) {
  try {
    const { customerId } = req.params;
    const customer = await customerService.findOne(customerId);
    const locations = await service.findByCustomerLocation(customer.id);
    res.json({ customer, locations });
  } catch (error) {
    next(error);
  }
}

async function createCustomerController(req, res, next) {
  try {
    const customer = await service.create(req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function updateCustomerController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const customer = await service.update(id, body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function destroyCustomerController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCustomersController,
  getCustomerByIdController,
  createCustomerController,
  updateCustomerController,
  destroyCustomerController,
  getCustomerByCustomerIdController,
};
