const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { OutOfStockOrder } = sequelize.models;

class OutOfStockOrderService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newOutOfStockOrder = await OutOfStockOrder.create(data);
    return newOutOfStockOrder.toJSON();
  }

  async findAll() {
    const outOfStockOrder = await OutOfStockOrder.findAll({
      include: ['createdBy'],
    });
    return outOfStockOrder;
  }

  async findOne(id) {
    const outOfStockOrder = await OutOfStockOrder.findByPk(id, {
      include: ['createdBy'],
    });

    if (!outOfStockOrder) {
      throw boom.notFound('Out of stock order not found');
    }

    return outOfStockOrder;
  }

  async update(id, changes) {
    const outOfStockOrder = await this.findOne(id);
    const res = await outOfStockOrder.update(changes);

    return res;
  }

  async delete(id) {
    const outOfStockOrder = await this.findOne(id);
    await outOfStockOrder.destroy();

    return outOfStockOrder;
  }
}

module.exports = OutOfStockOrderService;
