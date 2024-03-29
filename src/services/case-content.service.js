const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { CaseContent, Order, CustomerLocation } = sequelize.models;

class CaseContentsService {
  constructor() {}

  async create(data) {
    const newCaseContent = await CaseContent.create(data);
    return newCaseContent.toJSON();
  }

  async findAll() {
    const casesContent = await CaseContent.findAll();
    return casesContent;
  }

  async findOne(id) {
    const caseContent = await CaseContent.findByPk(id, {
      include: [
        {
          model: Order,
          as: 'orders',
          include: [
            'createdBy',
            'assignedTo',
            'orderStatus',
            {
              model: CustomerLocation,
              as: 'customerLocation',
              include: ['customer'],
            },
          ],
        },
      ],
    });

    if (!caseContent) {
      throw boom.notFound('CaseContent not found');
    }

    return caseContent;
  }

  async update(id, changes) {
    const caseContent = await this.findOne(id);
    await caseContent.update(changes);

    return this.findOne(id);
  }

  async delete(id) {
    const caseContent = await this.findOne(id);
    await caseContent.destroy();

    return this.findOne(id);
  }
}

module.exports = CaseContentsService;
