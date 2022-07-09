const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { Truck, TruckPermission, UserTrucks } = sequelize.models;

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
    const trucks = await Truck.findAll();
    return trucks;
  }

  async findOne(id) {
    const truck = await Truck.findByPk(id, {
      include: ['driver'],
    });

    if (!truck) {
      throw boom.notFound('Truck not found');
    }

    return truck;
  }

  async update(id, changes) {
    const truck = await this.findOne(id);
    
    let res;
    if ('userId' in changes) {
      await this.userService.findOne(changes.userId);
      res = await truck.update(changes);
    } else {
      res = await truck.update(changes);
    }

    return res;
  }

  async delete(id) {
    const truck = await this.findOne(id);
    await truck.destroy();

    return truck;
  }
}

module.exports = TrucksService;
