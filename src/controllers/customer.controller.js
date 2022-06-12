const CustomerService = require('../services/customer.service');

const service = new CustomerService();

async function getCustomersController(_req, res, next) {
  try {
    const roles = await service.findAll();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

async function getCustomerByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const role = await service.findOne(id);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

async function createCustomerController(req, res, next) {
  try {
    const role = await service.create(req.body);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

async function updateCustomerController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const role = await service.update(id, body);
    res.json(role);
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
};
