const AnalyticsService = require('../services/analytics.service');

const service = new AnalyticsService();

async function mostUsedCasesController(_req, res, next) {
  try {
    const data = await service.caseMostUsed();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function bestCustomersController(_req, res, next) {
  try {
    res.json({ hola: 'mundo' });
  } catch (error) {
    next(error);
  }
}

async function worstCustomersController(_req, res, next) {
  try {
    res.json({ hola: 'mundo' });
  } catch (error) {
    next(error);
  }
}

async function bestFlavorsController(_req, res, next) {
  try {
    res.json({ hola: 'mundo' });
  } catch (error) {
    next(error);
  }
}

async function bestTrucksController(_req, res, next) {
  try {
    res.json({ hola: 'mundo' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  mostUsedCasesController,
  bestCustomersController,
  worstCustomersController,
  bestFlavorsController,
  bestTrucksController,
};
