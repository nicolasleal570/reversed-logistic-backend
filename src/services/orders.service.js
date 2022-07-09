const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');
const OrderItemService = require('./order-items.service');

const { Order, OrderItem } = sequelize.models;

class OrdersService {
  constructor() {
    this.userService = new UserService();
    this.orderItemsService = new OrderItemService();
  }

  async create(data) {
    const { items, ...orderInfo } = data;
    let newOrder = await Order.create(orderInfo);
    newOrder = newOrder.toJSON();

    await Promise.all(
      items.map((item) =>
        this.orderItemsService.create({ ...item, orderId: newOrder.id })
      )
    );

    return this.findOne(newOrder.id);
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
