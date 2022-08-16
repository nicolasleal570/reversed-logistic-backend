const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { ProcessStep } = sequelize.models;

class ProcessStepsService {
  constructor() {}

  async create(data) {
    const newProcessStep = await ProcessStep.create(data);
    return newProcessStep.toJSON();
  }

  async findAll() {
    const ProcessSteps = await ProcessStep.findAll();
    return ProcessSteps;
  }

  async findOne(id) {
    const processStep = await ProcessStep.findByPk(id);

    if (!processStep) {
      throw boom.notFound('Process step not found');
    }

    return processStep;
  }

  async update(id, changes) {
    const processStep = await this.findOne(id);
    const res = await processStep.update(changes);

    return res;
  }

  async delete(id) {
    const processStep = await this.findOne(id);
    await processStep.destroy();

    return processStep;
  }
}

module.exports = ProcessStepsService;
