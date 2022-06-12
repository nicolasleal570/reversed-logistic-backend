const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { CaseProcessStep } = sequelize.models;

class CaseProcessStepsService {
  constructor() {}

  async create(data) {
    const newCaseProcessStep = await CaseProcessStep.create(data);
    return newCaseProcessStep.toJSON();
  }

  async findAll() {
    const caseProcessSteps = await CaseProcessStep.findAll({
      include: ['nextProcessStep'],
    });
    return caseProcessSteps;
  }

  async findOne(id) {
    const caseProcessStep = await CaseProcessStep.findByPk(id, {
      include: ['nextProcessStep'],
    });

    if (!caseProcessStep) {
      throw boom.notFound('CaseProcessStep not found');
    }

    return caseProcessStep;
  }

  async update(id, changes) {
    const caseProcessStep = await this.findOne(id);
    const res = await caseProcessStep.update(changes);

    return res;
  }

  async delete(id) {
    const caseProcessStep = await this.findOne(id);
    await caseProcessStep.destroy();

    return caseProcessStep;
  }
}

module.exports = CaseProcessStepsService;
