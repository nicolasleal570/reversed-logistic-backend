const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { Case } = sequelize.models;

class CasesService {
  constructor() {}

  async create(data) {
    const newCase = await Case.create(data);
    return newCase.toJSON();
  }

  async findAll() {
    const cases = await Case.findAll();
    return cases;
  }

  async findOne(id) {
    const caseItem = await Case.findByPk(id);

    if (!caseItem) {
      throw boom.notFound('Case not found');
    }

    return caseItem;
  }

  async update(id, changes) {
    const caseItem = await this.findOne(id);
    const res = await caseItem.update(changes);

    return res;
  }

  async delete(id) {
    const caseItem = await this.findOne(id);
    await caseItem.destroy();

    return caseItem;
  }
}

module.exports = CasesService;
