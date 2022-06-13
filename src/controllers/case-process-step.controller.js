const ProcessStepService = require('../services/case-process-step.service');

const service = new ProcessStepService();

async function getProcessStepsController(_req, res, next) {
  try {
    const ProcessSteps = await service.findAll();
    res.json(ProcessSteps);
  } catch (error) {
    next(error);
  }
}

async function getProcessStepByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const ProcessStep = await service.findOne(id);
    res.json(ProcessStep);
  } catch (error) {
    next(error);
  }
}

async function createProcessStepController(req, res, next) {
  try {
    const ProcessStep = await service.create(req.body);
    res.json(ProcessStep);
  } catch (error) {
    next(error);
  }
}

async function updateProcessStepController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const ProcessStep = await service.update(id, body);
    res.json(ProcessStep);
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
