const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { Order, OrderItem } = sequelize.models;

class OrdersService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newOrder = await Order.create(data);
    return newOrder.toJSON();
  }

  async findAll() {
    const orders = await Order.findAll({ include: ['createdBy'] });
    return orders;
  }

  async findOne(id) {
    const order = await Order.findByPk(id, {
      include: [
        'createdBy',
        'customerLocation',
        'orderStatus',
        { model: OrderItem, as: 'items', include: ['case', 'caseContent'] },
      ],
    });

    if (!order) {
      throw boom.notFound('Order not found');
    }

    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const res = await order.update(changes);

    return res;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();

    return order;
  }
}

module.exports = OrdersService;
