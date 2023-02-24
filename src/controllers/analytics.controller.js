const AnalyticsService = require('../services/analytics.service');

const service = new AnalyticsService();

async function ordersByCustomerLocationsController(req, res, next) {
  try {
    const data = await service.getOrdersByCustomerLocations({
      ...req.body,
      ...req.query,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCustomersController(req, res, next) {
  try {
    const data = await service.getBestCustomers(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCustomersLocationController(req, res, next) {
  try {
    const data = await service.getBestCustomersLocation(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCaseContetsController(req, res, next) {
  try {
    const data = await service.getBestCaseContents(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCasesController(req, res, next) {
  try {
    const data = await service.getBestCases(req.query);
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
    const data = await service.getDeliveryAtTime(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function shipmentsCountController(req, res, next) {
  try {
    const data = await service.getShipmentsCount(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function lateDeliveriesController(req, res, next) {
  try {
    const data = await service.getLateDeliveries(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function inventoryTurnoverController(req, res, next) {
  try {
    const data = await service.getInventoryTurnover(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function stockRotationController(req, res, next) {
  try {
    const data = await service.getStockRotation(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  bestCasesController,
  ordersByCustomerLocationsController,
  bestCustomersController,
  bestCustomersLocationController,
  bestCaseContetsController,
  bestTrucksController,
  deliveryAtTimeController,
  shipmentsCountController,
  lateDeliveriesController,
  inventoryTurnoverController,
  stockRotationController,
};
