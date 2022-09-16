const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { OutOfStockStatus } = sequelize.models;

class OutOfStockStatusService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newOutOfStockStatus = await OutOfStockStatus.create(data);
    return newOutOfStockStatus.toJSON();
  }

  async findAll() {
    const outOfStockStatus = await OutOfStockStatus.findAll({ include: ['createdBy'] });
    return outOfStockStatus;
  }

  async findOne(id) {
    const outOfStockStatus = await OutOfStockStatus.findByPk(id, {
      include: ['createdBy'],
    });

    if (!outOfStockStatus) {
      throw boom.notFound('Out of stock status not found');
    }

    return outOfStockStatus;
  }

  async update(id, changes) {
    const outOfStockStatus = await this.findOne(id);
    const res = await outOfStockStatus.update(changes);

    return res;
  }

  async delete(id) {
    const outOfStockStatus = await this.findOne(id);
    await outOfStockStatus.destroy();

    return outOfStockStatus;
  }
}

module.exports = OutOfStockStatusService;
