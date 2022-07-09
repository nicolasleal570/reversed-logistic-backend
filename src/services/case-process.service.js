const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { CaseProcess, ProcessStep } = sequelize.models;

class CaseProcesssService {
  constructor() {
  }

  async create(data) {
    const newCaseProcess = await CaseProcess.create(data);
    return newCaseProcess.toJSON();
  }

  async findAll() {
    const caseProcesses = await CaseProcess.findAll({
      include: ['case', 'caseContent', 'starterProcessStep', 'createdBy']
    });
    return caseProcesses;
  }

  async findOne(id) {
    const caseProcess = await CaseProcess.findByPk(id, {
      include: ['case', 'caseContent', {
        model: ProcessStep,
        as: 'starterProcessStep',
        include: ['nextProcessStep']
      }, 'createdBy']
    });

    if (!caseProcess) {
      throw boom.notFound('Case process not found');
    }

    return caseProcess;
  }

  async update(id, changes) {
    const caseProcess = await this.findOne(id);
    const res = await caseProcess.update(changes);
    const caseProceessUpdated = await this.findOne(id);

    return caseProceessUpdated;
  }

  async delete(id) {
    const caseProcess = await this.findOne(id);
    await caseProcess.destroy();

    return caseProcess;
  }
}

module.exports = CaseProcesssService;
