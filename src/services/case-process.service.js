const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { CaseProcess } = sequelize.models;

class CaseProcesssService {
  constructor() {
  }

  async create(data) {
    const newCaseProcess = await CaseProcess.create(data);
    return newCaseProcess.toJSON();
  }

  async findAll() {
    const caseProcesses = await CaseProcess.findAll();
    return caseProcesses;
  }

  async findOne(id) {
    const caseProcess = await CaseProcess.findByPk(id);

    if (!caseProcess) {
      throw boom.notFound('Case process not found');
    }

    return caseProcess;
  }

  async update(id, changes) {
    const caseProcess = await this.findOne(id);
    const res = await caseProcess.update(changes);

    return res;
  }

  async delete(id) {
    const caseProcess = await this.findOne(id);
    await caseProcess.destroy();

    return caseProcess;
  }
}

module.exports = CaseProcesssService;
