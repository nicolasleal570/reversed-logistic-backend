const boom = require('@hapi/boom');
const CasesService = require('../services/cases.service');

const service = new CasesService();

async function getCasesController(req, res, next) {
  try {
    const filterParams = req.query ?? {};
    const cases = await service.findAll(filterParams);
    res.json(cases);
  } catch (error) {
    next(error);
  }
}

async function getCaseByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const caseItem = await service.findOne(id);
    res.json(caseItem);
  } catch (error) {
    next(error);
  }
}

async function getCasesByCustomerController(req, res, next) {
  try {
    const {
      sub: { id: customerLocationId, isLocation },
    } = req.user;

    if (!isLocation) {
      throw boom.forbidden('This action is not supported for regular users');
    }

    const cases = await service.findCasesByCustomer(customerLocationId);
    res.json(cases);
  } catch (error) {
    next(error);
  }
}

async function createCaseController(req, res, next) {
  try {
    const caseItem = await service.create(req.body);
    res.json(caseItem);
  } catch (error) {
    next(error);
  }
}

async function updateCaseController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const caseItem = await service.update(id, body);
    res.json(caseItem);
  } catch (error) {
    next(error);
  }
}

async function destroyCaseController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function getCasesWaitingCleanProcessController(_req, res, next) {
  try {
    const data = await service.findCasesWaitingCleanProcess();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCasesController,
  getCaseByIdController,
  getCasesByCustomerController,
  getCasesWaitingCleanProcessController,
  createCaseController,
  updateCaseController,
  destroyCaseController,
};
