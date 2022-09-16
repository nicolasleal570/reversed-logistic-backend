const CaseCleanProcessStepService = require('../services/case-clean-process-steps.service');

const service = new CaseCleanProcessStepService();

async function getCaseCleanProcessStepsController(_req, res, next) {
  try {
    const caseCleanProcessSteps = await service.findAll();
    res.json(caseCleanProcessSteps);
  } catch (error) {
    next(error);
  }
}

async function getCaseCleanProcessStepByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const caseCleanProcessStep = await service.findOne(id);
    res.json(caseCleanProcessStep);
  } catch (error) {
    next(error);
  }
}

async function createCaseCleanProcessStepController(req, res, next) {
  try {
    const {
      sub: { id: userId, isLocation },
    } = req.user;

    const caseCleanProcessStep = await service.create({
      ...req.body,
      createdById: userId,
    });
    res.json(caseCleanProcessStep);
  } catch (error) {
    next(error);
  }
}

async function updateCaseCleanProcessStepController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const caseCleanProcessStep = await service.update(id, body);
    res.json(caseCleanProcessStep);
  } catch (error) {
    next(error);
  }
}

async function destroyCaseCleanProcessStepController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCaseCleanProcessStepsController,
  getCaseCleanProcessStepByIdController,
  createCaseCleanProcessStepController,
  updateCaseCleanProcessStepController,
  destroyCaseCleanProcessStepController,
};
