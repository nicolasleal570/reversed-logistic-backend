const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');
const OrderItemService = require('./order-items.service');

const { Order, OrderItem, CustomerLocation } = sequelize.models;

class OrdersService {
  constructor() {
    this.userService = new UserService();
    this.orderItemsService = new OrderItemService();
  }

  async create(data) {
    const { items, ...orderInfo } = data;
    let newOrder = await Order.create({
      ...orderInfo,
      subTotal: orderInfo?.subTotal ?? 0,
      tax: orderInfo?.tax ?? 0,
      total: orderInfo?.total ?? 0,
      orderStatusId: orderInfo?.orderStatusId ?? 1,
      createdById: orderInfo?.createdById ?? 1,
    });
    newOrder = newOrder.toJSON();

    await Promise.all(
      items.map((item) =>
        this.orderItemsService.create({ ...item, orderId: newOrder.id })
      )
    );

    return this.findOne(newOrder.id);
  }

  async findAll() {
    const orders = await Order.findAll({
      include: ['createdBy', 'orderStatus'],
    });
    return orders;
  }

  async findOne(id) {
    const order = await Order.findByPk(id, {
      include: [
        'createdBy',
        'orderStatus',
        {
          model: CustomerLocation,
          as: 'customerLocation',
          include: ['customer'],
        },
        { model: OrderItem, as: 'items', include: ['case', 'caseContent'] },
      ],
    });

    if (!order) {
      throw boom.notFound('Order not found');
    }

    return order;
  }

  async update(id, changes) {
    let order = await this.findOne(id);
    const { items, ...restChanges } = changes;

    if ('items' in changes && items) {
      const itemsObj = await Promise.all(
        items.map((item) => {
          console.log({ item });
          return this.orderItemsService.findOne(item.id);
        })
      );

      await Promise.all(
        itemsObj.map((item, idx) => {
          const { caseId, caseContentId, quantity } = items[idx];
          return item.update({ caseId, caseContentId, quantity });
        })
      );
    }

    await order.update(restChanges);
    order = await this.findOne(id);

    return order;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();

    return order;
  }
}

module.exports = OrdersService;
