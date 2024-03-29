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
    const { paranoid } = req.query;
    const { jsonData: caseItem } = await service.findOne(id, { paranoid });
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
    const { jsonData: caseItem } = await service.update(id, body);
    res.json(caseItem);
  } catch (error) {
    next(error);
  }
}

async function destroyCaseController(req, res, next) {
  try {
    const { id } = req.params;
    const { jsonData } = await service.delete(id);
    res.json(jsonData);
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

async function getCaseLastOutOfStockInfo(req, res, next) {
  try {
    const { id } = req.params;
    const data = await service.findCaseLastOutOfStockInfo(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function handleCaseStateAfterPickupDoneController(req, res, next) {
  try {
    const { id } = req.params;
    const data = await service.handleCaseStateAfterPickupDone(id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function recoverCaseController(req, res, next) {
  try {
    const { id } = req.params;
    const { jsonData } = await service.recover(id);
    res.json(jsonData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCasesController,
  getCaseByIdController,
  getCasesByCustomerController,
  getCasesWaitingCleanProcessController,
  getCaseLastOutOfStockInfo,
  createCaseController,
  updateCaseController,
  destroyCaseController,
  handleCaseStateAfterPickupDoneController,
  recoverCaseController,
};
