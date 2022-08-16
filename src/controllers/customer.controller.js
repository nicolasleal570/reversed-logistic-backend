const CustomerService = require('../services/customer.service');

const service = new CustomerService();

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

async function createCustomerController(req, res, next) {
  try {
    const customer = await service.create(req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function createCustomerWithLocationsController(req, res, next) {
  try {
    const customer = await service.createWithLocations(req.body);
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

async function updateCustomerWithLocationsController(req, res, next) {
  try {
    const { customerId } = req.params;
    const customer = await service.updateWithLocations(customerId, req.body);
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
  createCustomerWithLocationsController,
  updateCustomerController,
  updateCustomerWithLocationsController,
  destroyCustomerController,
};
