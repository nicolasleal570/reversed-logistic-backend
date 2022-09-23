const AnalyticsService = require('../services/analytics.service');

const service = new AnalyticsService();

async function mostUsedCasesController(_req, res, next) {
  try {
    const data = await service.mostUsed();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  mostUsedCasesController,
};
