const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { OutOfStockItem } = sequelize.models;

class OutOfStockItemService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newOutOfStockItem = await OutOfStockItem.create(data);
    return newOutOfStockItem.toJSON();
  }

  async findAll() {
    const outOfStockItems = await OutOfStockItem.findAll({
      include: [],
    });
    return outOfStockItems;
  }

  async findOne(id) {
    const outOfStockItem = await OutOfStockItem.findByPk(id, {
      include: [],
    });

    if (!outOfStockItem) {
      throw boom.notFound('out of stock item not found');
    }

    return outOfStockItem;
  }

  async update(id, changes) {
    const outOfStockItem = await this.findOne(id);
    const res = await outOfStockItem.update(changes);

    return res;
  }

  async delete(id) {
    const outOfStockItem = await this.findOne(id);
    await outOfStockItem.destroy();

    return outOfStockItem;
  }
}

module.exports = OutOfStockItemService;
