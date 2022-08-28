const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { CaseCleanProcessStep } = sequelize.models;

class CaseCleanProcessStepsService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newCaseCleanProcessStep = await CaseCleanProcessStep.create(data);
    return newCaseCleanProcessStep.toJSON();
  }

  async findAll() {
    const caseCleanProcessSteps = await CaseCleanProcessStep.findAll({
      include: ['createdBy'],
    });
    return caseCleanProcessSteps;
  }

  async findOne(id) {
    const caseCleanProcessStep = await CaseCleanProcessStep.findByPk(id, {
      include: ['createdBy'],
    });

    if (!caseCleanProcessStep) {
      throw boom.notFound('Case clean process step not found');
    }

    return caseCleanProcessStep;
  }

  async update(id, changes) {
    const caseCleanProcessStep = await this.findOne(id);
    const res = await caseCleanProcessStep.update(changes);

    return res;
  }

  async delete(id) {
    const caseCleanProcessStep = await this.findOne(id);
    await caseCleanProcessStep.destroy();

    return caseCleanProcessStep;
  }
}

module.exports = CaseCleanProcessStepsService;
