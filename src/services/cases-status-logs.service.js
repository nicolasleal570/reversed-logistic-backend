const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const CasesService = require('./cases.service');

const { CasesStatusLog, Case } = sequelize.models;

const casesService = new CasesService();

class CasesStatusLogsService {
  constructor() {}

  async countAvailableCasesTimes({ caseId }) {
    await casesService.findOne(caseId);

    const { count, rows: logs } = await CasesStatusLog.findAndCountAll({
      order: [['id', 'ASC']],
      include: ['case'],
      where: {
        caseId,
        status: 'AVAILABLE',
      },
    });

    if (!logs) {
      return boom.badRequest('No hay ningún registro asociado a este case.');
    }

    return {
      count,
      logs,
    };
  }
}

module.exports = CasesStatusLogsService;
