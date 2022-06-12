const CaseProcessStepService = require('../services/case-process-step.service');

const service = new CaseProcessStepService();

async function getCaseProcessStepsController(_req, res, next) {
  try {
    const caseProcessSteps = await service.findAll();
    res.json(caseProcessSteps);
  } catch (error) {
    next(error);
  }
}

async function getCaseProcessStepByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const caseProcessStep = await service.findOne(id);
    res.json(caseProcessStep);
  } catch (error) {
    next(error);
  }
}

async function createCaseProcessStepController(req, res, next) {
  try {
    const caseProcessStep = await service.create(req.body);
    res.json(caseProcessStep);
  } catch (error) {
    next(error);
  }
}

async function updateCaseProcessStepController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const caseProcessStep = await service.update(id, body);
    res.json(caseProcessStep);
  } catch (error) {
    next(error);
  }
}

async function destroyCaseProcessStepController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCaseProcessStepsController,
  getCaseProcessStepByIdController,
  createCaseProcessStepController,
  updateCaseProcessStepController,
  destroyCaseProcessStepController,
};
