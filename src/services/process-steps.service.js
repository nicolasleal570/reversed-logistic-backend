const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { ProcessStep } = sequelize.models;

class ProcessStepsService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newProcessStep = await ProcessStep.create(data);
    return newProcessStep.toJSON();
  }

  async findAll() {
    const processSteps = await ProcessStep.findAll({
      include: ['createdBy'],
    });
    return processSteps;
  }

  async findOne(id) {
    const processSteps = await ProcessStep.findByPk(id, {
      include: ['createdBy'],
    });

    if (!processSteps) {
      throw boom.notFound('Process Step not found');
    }

    return processSteps;
  }

  async update(id, changes) {
    const processSteps = await this.findOne(id);
    await processSteps.update(changes);

    return this.findOne(id);
  }

  async delete(id) {
    const processSteps = await this.findOne(id);
    await processSteps.destroy();

    return processSteps;
  }
}

module.exports = ProcessStepsService;
