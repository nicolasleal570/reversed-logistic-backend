const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');
const OrderItemService = require('./order-items.service');
const CasesService = require('./cases.service');
const CasesContentService = require('./case-content.service');
const ShipmentService = require('./shipments.service');
const { orderStateToCaseState } = require('../db/models/case.model');

const { Order, OrderItem, CustomerLocation } = sequelize.models;

const shipmentService = new ShipmentService();

const casesService = new CasesService();
const casesContentService = new CasesContentService();

class OrdersService {
  constructor() {
    this.userService = new UserService();
    this.orderItemsService = new OrderItemService();
  }

  async calculateOrderPrice(items) {
    const casesContent = await Promise.all(
      items.map((item) => casesContentService.findOne(item.caseContentId))
    );

    return items.reduce((acc, curr, index) => {
      const currentCaseContent = casesContent[index];
      return acc + currentCaseContent.price * curr.quantity;
    }, 0);
  }

  async create(data) {
    const { items, ...orderInfo } = data;
    const orderPrice = await this.calculateOrderPrice(items);

    let newOrder = await Order.create({
      ...orderInfo,
      subTotal: orderPrice,
      tax: orderInfo?.tax ?? 0,
      total: orderPrice,
      orderStatusId: orderInfo?.orderStatusId ?? 1,
      createdById: orderInfo?.createdById ?? 1,
    });
    newOrder = newOrder.toJSON();

    await Promise.all(
      items.map((item) =>
        this.orderItemsService.create({ ...item, orderId: newOrder.id })
      )
    );

    await Promise.all(
      items.map((item) =>
        casesService.update(item.caseId, {
          state: orderStateToCaseState[orderInfo?.orderStatusId ?? 1],
        })
      )
    );

    return this.findOne(newOrder.id);
  }

  async findAll() {
    const orders = await Order.findAll({
      include: ['createdBy', 'assignedTo', 'orderStatus', 'customerLocation'],
      order: [
        ['orderStatusId', 'ASC'],
        ['purchaseDate', 'ASC'],
      ],
    });
    return orders;
  }

  async findOne(id) {
    let order = await Order.findByPk(id, {
      include: [
        'createdBy',
        'assignedTo',
        'orderStatus',
        'shipment',
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

    const haveToUpdateItems = 'items' in changes && items;

    if (haveToUpdateItems) {
      // Find order items
      const itemsObj = await Promise.all(
        items
          .filter((item) => item.id !== '')
          .map((item) => {
            return this.orderItemsService.findOne(item.id);
          })
      );

      // Create new order items
      await Promise.all(
        items
          .filter((item) => !item.id)
          .map(({ id: _, ...item }) =>
            this.orderItemsService.create({ ...item, orderId: id })
          )
      );

      // Update order items
      await Promise.all(
        itemsObj.map((item, idx) => {
          const { caseId, caseContentId, quantity } = items[idx];
          return item.update({ caseId, caseContentId, quantity });
        })
      );

      const newOrderPrice = await this.calculateOrderPrice(items);
      await order.update({
        subTotal: newOrderPrice,
        total: newOrderPrice,
        updatedAt: new Date(),
      });
    }

    await order.update(restChanges);

    return this.findOne(id);
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();

    return this.findOne(id);
  }

  async takeOrder(orderId, userId) {
    let order = await this.findOne(orderId);

    if (order.orderStatusId !== 1) {
      throw boom.notFound(
        'No puedes tomar una orden que ya fue finalizada, enviada o entregada'
      );
    }

    order = await this.update(orderId, {
      assignedToId: userId,
      orderStatusId: 2, // Packing in transit
    });

    return this.findOne(orderId);
  }

  async markAsReady(orderId) {
    let order = await this.findOne(orderId);

    if (order.orderStatusId > 2) {
      throw boom.notFound(
        'No puedes volver a finalizar una orden que ya fue finalizada, enviada o entregada'
      );
    }

    order = await this.update(orderId, {
      orderStatusId: 3, // Packing finished
    });

    return this.findOne(orderId);
  }

  async assignShipment(data) {
    const { orderId, shipmentId } = data;

    let order = await this.findOne(orderId);

    if (order.orderStatusId > 3) {
      throw boom.notFound('Esta orden ya fue enviada, no puedes editarla');
    }

    const shipment = await shipmentService.findOne(shipmentId);

    let payload = {
      orderStatusId: 4, // Waiting shipping
      shipmentId,
    };

    if (shipment.shipmentAt) {
      payload = {
        ...payload,
        orderStatusId: 5, // Shipping in progress
      };
    }

    order = await this.update(orderId, payload);

    return this.findOne(orderId);
  }
}

module.exports = OrdersService;
