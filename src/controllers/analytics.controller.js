const AnalyticsService = require('../services/analytics.service');

const service = new AnalyticsService();

async function ordersByCustomerLocationsController(req, res, next) {
  try {
    const data = await service.getOrdersByCustomerLocations(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCustomersController(_req, res, next) {
  try {
    const data = await service.getBestCustomers();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCaseContetsController(_req, res, next) {
  try {
    const data = await service.getBestCaseContents();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCasesController(_req, res, next) {
  try {
    const data = await service.getBestCases();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

// TODO: Add this query
async function bestTrucksController(_req, res, next) {
  try {
    res.json({ hola: 'mundo' });
  } catch (error) {
    next(error);
  }
}

async function deliveryAtTimeController(req, res, next) {
  try {
    const data = await service.getDeliveryAtTime(req.params);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  bestCasesController,
  ordersByCustomerLocationsController,
  bestCustomersController,
  bestCaseContetsController,
  bestTrucksController,
  deliveryAtTimeController,
};
