const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { ShipmentStatus } = sequelize.models;

class ShipmentStatusService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newShipmentStatus = await ShipmentStatus.create(data);
    return newShipmentStatus.toJSON();
  }

  async findAll() {
    const orderStatus = await ShipmentStatus.findAll({
      include: ['createdBy'],
    });
    return orderStatus;
  }

  async findOne(id) {
    const orderStatus = await ShipmentStatus.findByPk(id, {
      include: ['createdBy'],
    });

    if (!orderStatus) {
      throw boom.notFound('Shipment status not found');
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

module.exports = ShipmentStatusService;
