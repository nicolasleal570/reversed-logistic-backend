const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const { Shipment, Order, Truck } = sequelize.models;

class ShipmentsService {
  constructor() {}

  async create(data) {
    let payload = {
      ...data,
    };

    if (data.shipmentAt && !Number.isNaN(Date.parse(data.shipmentAt))) {
      payload = {
        ...payload,
        statusId: 2,
      };
    }

    const newShipment = await Shipment.create({
      ...payload,
      trackNumber: Math.random().toString(36).substring(2, 15),
    });
    return newShipment.toJSON();
  }

  async findAll(params = {}) {
    const { status } = params;
    let where = {};

    if (status === 'AVAILABLE') {
      where = {
        ...where,
        shipmentAt: { [Op.is]: null },
        deliveredAt: { [Op.is]: null },
      };
    }

    if (status === 'DONE') {
      where = {
        ...where,
        shipmentAt: {
          [Op.not]: null,
        },
        deliveredAt: {
          [Op.not]: null,
        },
      };
    }

    const shipments = await Shipment.findAll({
      include: ['createdBy', 'orders', 'truck', 'status'],
      where,
      order: [['deliveredAt', 'DESC']],
    });
    return shipments;
  }

  async findOne(id) {
    const shipment = await Shipment.findByPk(id, {
      include: [
        'createdBy',
        {
          model: Order,
          as: 'orders',
          include: [
            'orderStatus',
            'createdBy',
            'assignedTo',
            'customerLocation',
          ],
        },
        {
          model: Truck,
          as: 'truck',
          include: ['driver'],
        },
        'status',
      ],
    });

    if (!shipment) {
      throw boom.notFound('Shipment not found');
    }

    return shipment;
  }

  async update(id, changes) {
    const shipment = await this.findOne(id);

    let payload = {
      ...changes,
    };
    if (changes.shipmentAt && !Number.isNaN(Date.parse(changes.shipmentAt))) {
      payload = {
        ...payload,
        statusId: 2,
      };
    } else if (
      changes.deliveredAt &&
      !Number.isNaN(Date.parse(changes.deliveredAt))
    ) {
      payload = {
        ...payload,
        statusId: 3,
      };
    } else {
      payload = {
        ...payload,
        statusId: 1,
      };
    }

    await shipment.update(payload);

    return this.findOne(id);
  }

  async delete(id) {
    const shipment = await this.findOne(id);
    await shipment.destroy();

    return shipment;
  }

  async startShipping(shippingId) {
    await this.update(shippingId, {
      shipmentAt: new Date(),
      statusId: 2,
    });

    return this.findOne(shippingId);
  }
}

module.exports = ShipmentsService;
