const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');
const OutOfStockItemService = require('./out-of-stock-items.service');
const { outOfStockOrderStateToCaseState } = require('../db/models/case.model');

const { OutOfStockOrder, Case } = sequelize.models;

const outOfStockItemService = new OutOfStockItemService();

class OutOfStockOrderService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    let { items, ...restData } = data;
    let newOutOfStockOrder = await OutOfStockOrder.create({
      ...restData,
      statusId: 1,
    });
    newOutOfStockOrder = newOutOfStockOrder.toJSON();

    if (items.length) {
      // Create out of stock items
      items = await Promise.all(
        items.map((item) =>
          outOfStockItemService.create({
            ...item,
            outOfStockOrderId: newOutOfStockOrder.id,
          })
        )
      );

      // Update cases state
      await Promise.all(
        items.map((item) =>
          Case.update(
            {
              state:
                outOfStockOrderStateToCaseState[newOutOfStockOrder.statusId],
            },
            { where: { id: item.caseId } }
          )
        )
      );
    }

    return { ...newOutOfStockOrder, items };
  }

  async findAll() {
    const outOfStockOrder = await OutOfStockOrder.findAll({
      include: ['createdBy', 'items', 'status', 'assignedTo'],
    });
    return outOfStockOrder;
  }

  async findOne(id) {
    const outOfStockOrder = await OutOfStockOrder.findByPk(id, {
      include: ['createdBy', 'items', 'status', 'assignedTo'],
    });

    if (!outOfStockOrder) {
      throw boom.notFound('Out of stock order not found');
    }

    return outOfStockOrder;
  }

  async update(id, changes) {
    const outOfStockOrder = await this.findOne(id);
    const res = await outOfStockOrder.update(changes);

    return res;
  }

  async delete(id) {
    const outOfStockOrder = await this.findOne(id);
    await outOfStockOrder.destroy();

    return outOfStockOrder;
  }
}

module.exports = OutOfStockOrderService;
