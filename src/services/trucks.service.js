const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { Truck } = sequelize.models;

class TrucksService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    await this.userService.findOne(data.userId);
    const newTruck = await Truck.create(data);
    return newTruck.toJSON();
  }

  async findAll() {
    const trucks = await Truck.findAll({
      include: ['driver'],
    });
    return trucks;
  }

  async findOne(id) {
    const truck = await Truck.findByPk(id, {
      include: ['driver', 'shipments'],
    });

    if (!truck) {
      throw boom.notFound('Truck not found');
    }

    return truck;
  }

  async update(id, changes) {
    const truck = await this.findOne(id);

    if ('userId' in changes) {
      await this.userService.findOne(changes.userId);
    }

    await truck.update(changes);

    return this.findOne(id);
  }

  async delete(id) {
    const truck = await this.findOne(id);
    await truck.destroy();

    return this.findOne(id);
  }
}

module.exports = TrucksService;
