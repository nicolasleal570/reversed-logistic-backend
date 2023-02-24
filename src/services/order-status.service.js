const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { OrderStatus } = sequelize.models;

class OrderStatusService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newOrderStatus = await OrderStatus.create(data);
    return newOrderStatus.toJSON();
  }

  async findAll() {
    const orderStatus = await OrderStatus.findAll({
      include: ['createdBy'],
    });
    return orderStatus;
  }

  async findOne(id) {
    const orderStatus = await OrderStatus.findByPk(id, {
      include: ['createdBy'],
    });

    if (!orderStatus) {
      throw boom.notFound('OrderStatus not found');
    }

    return orderStatus;
  }

  async update(id, changes) {
    const orderStatus = await this.findOne(id);
    const res = await orderStatus.update(changes);

    return res;
  }

  async delete(id) {
    const orderStatus = await this.findOne(id);
    await orderStatus.destroy();

    return orderStatus;
  }
}

module.exports = OrderStatusService;
