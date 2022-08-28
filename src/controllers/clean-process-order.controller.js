const CleanProcessOrderService = require('../services/clean-process-orders.service');

const service = new CleanProcessOrderService();

async function getCleanProcessOrdersController(_req, res, next) {
  try {
    const cleanProcessOrders = await service.findAll();
    res.json(cleanProcessOrders);
  } catch (error) {
    next(error);
  }
}

async function getCleanProcessOrderByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const cleanProcessOrder = await service.findOne(id);
    res.json(cleanProcessOrder);
  } catch (error) {
    next(error);
  }
}

async function createCleanProcessOrderController(req, res, next) {
  try {
    const { sub: userId } = req.user;
    const cleanProcessOrder = await service.create({
      ...req.body,
      createdById: userId,
    });
    res.json(cleanProcessOrder);
  } catch (error) {
    next(error);
  }
}

async function updateCleanProcessOrderController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const cleanProcessOrder = await service.update(id, body);
    res.json(cleanProcessOrder);
  } catch (error) {
    next(error);
  }
}

async function destroyCleanProcessOrderController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCleanProcessOrdersController,
  getCleanProcessOrderByIdController,
  createCleanProcessOrderController,
  updateCleanProcessOrderController,
  destroyCleanProcessOrderController,
};
