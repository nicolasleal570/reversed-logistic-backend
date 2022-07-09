const OrderStatusService = require('../services/order-status.service');

const service = new OrderStatusService();

async function getOrderStatusController(_req, res, next) {
  try {
    const orderStatus = await service.findAll();
    res.json(orderStatus);
  } catch (error) {
    next(error);
  }
}

async function getOrderStatusByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const orderStatus = await service.findOne(id);
    res.json(orderStatus);
  } catch (error) {
    next(error);
  }
}

async function createOrderStatusController(req, res, next) {
  try {
    const orderStatus = await service.create(req.body);
    res.json(orderStatus);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatusController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const orderStatus = await service.update(id, body);
    res.json(orderStatus);
  } catch (error) {
    next(error);
  }
}

async function destroyOrderStatusController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrderStatusController,
  getOrderStatusByIdController,
  createOrderStatusController,
  updateOrderStatusController,
  destroyOrderStatusController,
};
