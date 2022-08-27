const ProcessStepService = require('../services/process-steps.service');

const service = new ProcessStepService();

async function getProcessStepsController(_req, res, next) {
  try {
    const processSteps = await service.findAll();
    res.json(processSteps);
  } catch (error) {
    next(error);
  }
}

async function getProcessStepByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const processStep = await service.findOne(id);
    res.json(processStep);
  } catch (error) {
    next(error);
  }
}

async function createProcessStepController(req, res, next) {
  try {
    const { sub: userId } = req.user;
    const processStep = await service.create({...req.body, createdById: userId});
    res.json(processStep);
  } catch (error) {
    next(error);
  }
}

async function updateProcessStepController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const processStep = await service.update(id, body);
    res.json(processStep);
  } catch (error) {
    next(error);
  }
}

async function destroyProcessStepController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProcessStepsController,
  getProcessStepByIdController,
  createProcessStepController,
  updateProcessStepController,
  destroyProcessStepController,
};
