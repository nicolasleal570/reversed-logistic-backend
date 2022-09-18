const CleanProcessStatusService = require('../services/clean-process-status.service');

const service = new CleanProcessStatusService();

async function getCleanProcessStatusController(_req, res, next) {
  try {
    const cleanProcessStatus = await service.findAll();
    res.json(cleanProcessStatus);
  } catch (error) {
    next(error);
  }
}

async function getCleanProcessStatusByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const cleanProcessStatus = await service.findOne(id);
    res.json(cleanProcessStatus);
  } catch (error) {
    next(error);
  }
}

async function createCleanProcessStatusController(req, res, next) {
  try {
    const {
      sub: { id: userId, isLocation },
    } = req.user;
    const cleanProcessStatus = await service.create({
      ...req.body,
      createdById: userId,
    });
    res.json(cleanProcessStatus);
  } catch (error) {
    next(error);
  }
}

async function updateCleanProcessStatusController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const cleanProcessStatus = await service.update(id, body);
    res.json(cleanProcessStatus);
  } catch (error) {
    next(error);
  }
}

async function destroyCleanProcessStatusController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCleanProcessStatusController,
  getCleanProcessStatusByIdController,
  createCleanProcessStatusController,
  updateCleanProcessStatusController,
  destroyCleanProcessStatusController,
};
