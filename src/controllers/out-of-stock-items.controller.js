const OutOfStockItemService = require('../services/out-of-stock-items.service');

const service = new OutOfStockItemService();

async function getOutOfStockItemsController(_req, res, next) {
  try {
    const outOfStockItems = await service.findAll();
    res.json(outOfStockItems);
  } catch (error) {
    next(error);
  }
}

async function getOutOfStockItemByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const outOfStockItem = await service.findOne(id);
    res.json(outOfStockItem);
  } catch (error) {
    next(error);
  }
}

async function createOutOfStockItemController(req, res, next) {
  try {
    const outOfStockItem = await service.create(req.body);
    res.json(outOfStockItem);
  } catch (error) {
    next(error);
  }
}

async function updateOutOfStockItemController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const outOfStockItem = await service.update(id, body);
    res.json(outOfStockItem);
  } catch (error) {
    next(error);
  }
}

async function destroyOutOfStockItemController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOutOfStockItemsController,
  getOutOfStockItemByIdController,
  createOutOfStockItemController,
  updateOutOfStockItemController,
  destroyOutOfStockItemController,
};
