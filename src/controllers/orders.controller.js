const OrderService = require('../services/orders.service');

const service = new OrderService();

async function getOrdersController(_req, res, next) {
  try {
    const orders = await service.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function getOrderByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function createOrderController(req, res, next) {
  try {
    const order = await service.create(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function updateOrderController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const order = await service.update(id, body);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function destroyOrderController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

async function takeOrderController(req, res, next) {
  try {
    const { sub: userId } = req.user;
    const { orderId } = req.body;
    //TODO: Check user role and permissions
    const order = await service.takeOrder(orderId, userId);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function markOrderAsReadyController(req, res, next) {
  try {
    const { orderId } = req.body;
    const order = await service.markAsReady(orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function assignShipmentController(req, res, next) {
  try {
    const order = await service.assignShipment(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  destroyOrderController,
  takeOrderController,
  markOrderAsReadyController,
  assignShipmentController,
};
