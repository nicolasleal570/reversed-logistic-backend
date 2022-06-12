const CaseContentService = require('../services/case-content.service');

const service = new CaseContentService();

async function getCaseContentsController(_req, res, next) {
  try {
    const caseContents = await service.findAll();
    res.json(caseContents);
  } catch (error) {
    next(error);
  }
}

async function getCaseContentByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const caseContent = await service.findOne(id);
    res.json(caseContent);
  } catch (error) {
    next(error);
  }
}

async function createCaseContentController(req, res, next) {
  try {
    const caseContent = await service.create(req.body);
    res.json(caseContent);
  } catch (error) {
    next(error);
  }
}

async function updateCaseContentController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const caseContent = await service.update(id, body);
    res.json(caseContent);
  } catch (error) {
    next(error);
  }
}

async function destroyCaseContentController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCaseContentsController,
  getCaseContentByIdController,
  createCaseContentController,
  updateCaseContentController,
  destroyCaseContentController,
};
