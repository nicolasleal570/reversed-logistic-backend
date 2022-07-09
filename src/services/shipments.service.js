const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { Shipment } = sequelize.models;

class ShipmentsService {
  constructor() {}

  async create(data) {
    const newShipment = await Shipment.create({
      ...data,
      trackNumber: Math.random().toString(36).substring(2, 15)
    });
    return newShipment.toJSON();
  }

  async findAll() {
    const shipments = await Shipment.findAll();
    return shipments;
  }

  async findOne(id) {
    const shipment = await Shipment.findByPk(id, {
      include: ['createdBy', 'truck', 'orders'],
    });

    if (!shipment) {
      throw boom.notFound('Shipment not found');
    }

    return shipment;
  }

  async update(id, changes) {
    const shipment = await this.findOne(id);
    const res = await shipment.update(changes);

    return res;
  }

  async delete(id) {
    const shipment = await this.findOne(id);
    await shipment.destroy();

    return shipment;
  }
}

module.exports = ShipmentsService;
