const CaseProcessService = require('../services/case-process.service');

const service = new CaseProcessService();

async function getCaseProcessController(_req, res, next) {
  try {
    const caseProcesses = await service.findAll();
    res.json(caseProcesses);
  } catch (error) {
    next(error);
  }
}

async function getCaseProcessByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const caseProcess = await service.findOne(id);
    res.json(caseProcess);
  } catch (error) {
    next(error);
  }
}

async function createCaseProcessController(req, res, next) {
  try {
    const caseProcess = await service.create(req.body);
    res.json(caseProcess);
  } catch (error) {
    next(error);
  }
}

async function updateCaseProcessController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const caseProcess = await service.update(id, body);
    res.json(caseProcess);
  } catch (error) {
    next(error);
  }
}

async function destroyCaseProcessController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCaseProcessController,
  getCaseProcessByIdController,
  createCaseProcessController,
  updateCaseProcessController,
  destroyCaseProcessController,
};
