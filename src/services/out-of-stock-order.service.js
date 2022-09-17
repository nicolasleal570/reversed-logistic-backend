const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');
const OutOfStockItemService = require('./out-of-stock-items.service');
const {
  outOfStockOrderStateToCaseState,
  availablesStates,
} = require('../db/models/case.model');

const { OutOfStockOrder, OutOfStockItem, Case, CustomerLocation } =
  sequelize.models;

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
      include: [
        'createdBy',
        'items',
        'status',
        'assignedTo',
        {
          model: CustomerLocation,
          as: 'customerLocation',
          include: ['customer'],
        },
      ],
    });
    return outOfStockOrder;
  }

  async findOne(id) {
    const outOfStockOrder = await OutOfStockOrder.findByPk(id, {
      include: [
        'createdBy',
        {
          model: OutOfStockItem,
          as: 'items',
          include: ['case', 'caseContent', 'order'],
        },
        'status',
        'assignedTo',
        {
          model: CustomerLocation,
          as: 'customerLocation',
          include: ['customer'],
        },
      ],
    });

    if (!outOfStockOrder) {
      throw boom.notFound('Out of stock order not found');
    }

    return outOfStockOrder;
  }

  async update(id, changes) {
    const outOfStockOrder = await this.findOne(id);
    const res = await outOfStockOrder.update(changes);

    return {
      ...res.toJSON(),
      items: outOfStockOrder.toJSON().items,
    };
  }

  async delete(id) {
    const outOfStockOrder = await this.findOne(id);
    await outOfStockOrder.destroy();

    return outOfStockOrder;
  }

  async takeOutOfStockOrder(id, userId) {
    const updatedOrder = await this.update(id, {
      statusId: 2,
      pickedUpAt: new Date(),
      assignedToId: userId,
    });

    await Promise.all(
      updatedOrder.items
        //.filter((item) => item.case.state === availablesStates.OUT_OF_STOCK)
        .map((item) => {
          return Case.update(
            {
              state: outOfStockOrderStateToCaseState[updatedOrder.statusId],
            },
            { where: { id: item.id, state: availablesStates.OUT_OF_STOCK } }
          );
        })
    );

    return updatedOrder;
  }

  async finishOutOfStockOrder(id) {
    const updatedOrder = await this.update(id, {
      statusId: 3,
      doneAt: new Date(),
    });

    await Promise.all(
      updatedOrder.items.map((item) => {
        return Case.update(
          {
            state: outOfStockOrderStateToCaseState[updatedOrder.statusId],
          },
          { where: { id: item.id, state: availablesStates.PICKUP_IN_PROGRESS } }
        );
      })
    );

    return updatedOrder;
  }
}

module.exports = OutOfStockOrderService;
