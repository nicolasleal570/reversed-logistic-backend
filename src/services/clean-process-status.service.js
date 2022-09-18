const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { CleanProcessStatus } = sequelize.models;

class CleanProcessStatusService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newCleanProcessStatus = await CleanProcessStatus.create(data);
    return newCleanProcessStatus.toJSON();
  }

  async findAll() {
    const cleanProcessStatus = await CleanProcessStatus.findAll({
      include: ['createdBy'],
    });
    return cleanProcessStatus;
  }

  async findOne(id) {
    const cleanProcessStatus = await CleanProcessStatus.findByPk(id, {
      include: ['createdBy'],
    });

    if (!cleanProcessStatus) {
      throw boom.notFound('Clean process status not found');
    }

    return cleanProcessStatus;
  }

  async update(id, changes) {
    const cleanProcessStatus = await this.findOne(id);
    const res = await cleanProcessStatus.update(changes);

    return res;
  }

  async delete(id) {
    const cleanProcessStatus = await this.findOne(id);
    await cleanProcessStatus.destroy();

    return cleanProcessStatus;
  }
}

module.exports = CleanProcessStatusService;
