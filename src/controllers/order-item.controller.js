const OrderItemService = require('../services/order-items.service');

const service = new OrderItemService();

async function getOrderItemsController(_req, res, next) {
  try {
    const orderItems = await service.findAll();
    res.json(orderItems);
  } catch (error) {
    next(error);
  }
}

async function getOrderItemByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const orderItem = await service.findOne(id);
    res.json(orderItem);
  } catch (error) {
    next(error);
  }
}

async function createOrderItemController(req, res, next) {
  try {
    const orderItem = await service.create(req.body);
    res.json(orderItem);
  } catch (error) {
    next(error);
  }
}

async function updateOrderItemController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const orderItem = await service.update(id, body);
    res.json(orderItem);
  } catch (error) {
    next(error);
  }
}

async function destroyOrderItemController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrderItemsController,
  getOrderItemByIdController,
  createOrderItemController,
  updateOrderItemController,
  destroyOrderItemController,
};
