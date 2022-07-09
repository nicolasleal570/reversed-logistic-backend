const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const CaseService = require('./cases.service');
const CaseContentService = require('./case-content.service');
const OrderService = require('./orders.service');

const { OrderItem } = sequelize.models;

class OrderItemsService {
  constructor() {
    this.caseService = new CaseService()
    this.caseContentService = new CaseContentService()
    this.orderService = new OrderService()
  }

  async create(data) {
    await this.caseService.findOne(data.caseId)
    const caseContent = await this.caseContentService.findOne(data.caseContentId)
    await this.orderService.findOne(data.orderId)

    const newOrderItem = await OrderItem.create({
      ...data, 
      price: caseContent.price + caseContent.tax
    });
    return newOrderItem.toJSON();
  }

  async findAll() {
    const orderItems = await OrderItem.findAll();
    return orderItems;
  }

  async findOne(id) {
    const orderItem = await OrderItem.findByPk(id, {
      include: ['case', 'caseContent', 'order'],
    });

    if (!orderItem) {
      throw boom.notFound('Order Item not found');
    }

    return orderItem;
  }

  async update(id, changes) {
    const orderItem = await this.findOne(id);

    let res;
    if('caseContentId' in changes) {
      const caseContent = await this.caseContentService.findOne(changes.caseContentId)
      res = await orderItem.update({...changes, price: caseContent.price + caseContent.tax});
    } else {
      res = await orderItem.update(changes);
    }

    return res;
  }

  async delete(id) {
    const orderItem = await this.findOne(id);
    await orderItem.destroy();

    return orderItem;
  }
}

module.exports = OrderItemsService;
