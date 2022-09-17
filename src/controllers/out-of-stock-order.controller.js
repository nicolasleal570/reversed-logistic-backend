const OutOfStockOrderService = require('../services/out-of-stock-order.service');

const service = new OutOfStockOrderService();

async function getOutOfStockOrderController(_req, res, next) {
  try {
    const outOfStockOrder = await service.findAll();
    res.json(outOfStockOrder);
  } catch (error) {
    next(error);
  }
}

async function getOutOfStockOrderByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const outOfStockOrder = await service.findOne(id);
    res.json(outOfStockOrder);
  } catch (error) {
    next(error);
  }
}

async function createOutOfStockOrderController(req, res, next) {
  try {
    const {
      sub: { id: userId },
    } = req.user;

    const outOfStockOrder = await service.create({
      ...req.body,
      createdById: userId,
    });
    res.json(outOfStockOrder);
  } catch (error) {
    next(error);
  }
}

async function updateOutOfStockOrderController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const outOfStockOrder = await service.update(id, body);
    res.json(outOfStockOrder);
  } catch (error) {
    next(error);
  }
}

async function destroyOutOfStockOrderController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

async function takeOutOfStockOrderController(req, res, next) {
  try {
    const {
      sub: { id: userId },
    } = req.user;

    const { id: outOfStockOrderId } = req.body;

    const outOfStockOrder = await service.takeOutOfStockOrder(
      outOfStockOrderId,
      userId
    );

    res.json(outOfStockOrder);
  } catch (error) {
    next(error);
  }
}

async function finishOutOfStockOrderController(req, res, next) {
  try {
    const { id: outOfStockOrderId } = req.body;
    const outOfStockOrder = await service.finishOutOfStockOrder(
      outOfStockOrderId
    );

    res.json(outOfStockOrder);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOutOfStockOrderController,
  getOutOfStockOrderByIdController,
  createOutOfStockOrderController,
  updateOutOfStockOrderController,
  destroyOutOfStockOrderController,
  takeOutOfStockOrderController,
  finishOutOfStockOrderController,
};
