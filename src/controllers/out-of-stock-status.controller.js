const OutOfStockStatusService = require('../services/out-of-stock-status.service');

const service = new OutOfStockStatusService();

async function getOutOfStockStatusController(_req, res, next) {
  try {
    const outOfStockStatus = await service.findAll();
    res.json(outOfStockStatus);
  } catch (error) {
    next(error);
  }
}

async function getOutOfStockStatusByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const outOfStockStatus = await service.findOne(id);
    res.json(outOfStockStatus);
  } catch (error) {
    next(error);
  }
}

async function createOutOfStockStatusController(req, res, next) {
  try {
    const {
      sub: { id: userId },
    } = req.user;
    const outOfStockStatus = await service.create({
      ...req.body,
      createdById: userId,
    });
    res.json(outOfStockStatus);
  } catch (error) {
    next(error);
  }
}

async function updateOutOfStockStatusController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const outOfStockStatus = await service.update(id, body);
    res.json(outOfStockStatus);
  } catch (error) {
    next(error);
  }
}

async function destroyOutOfStockStatusController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOutOfStockStatusController,
  getOutOfStockStatusByIdController,
  createOutOfStockStatusController,
  updateOutOfStockStatusController,
  destroyOutOfStockStatusController,
};
