const CasesStatusLogsService = require('../services/cases-status-logs.service');

const service = new CasesStatusLogsService();

async function getCountAvailableCasesTimesController(req, res, next) {
  try {
    const { caseId } = req.params;
    const data = await service.countAvailableCasesTimes({ caseId });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCountAvailableCasesTimesController,
};
