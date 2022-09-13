const boom = require('@hapi/boom');
const { availablesStates } = require('../db/models/case.model');
const { sequelize } = require('../db/sequelize');

const { Case } = sequelize.models;

class CasesService {
  constructor() {}

  async create(data) {
    const newCase = await Case.create(data);
    return newCase.toJSON();
  }

  async findAll(filterParams = {}) {
    let where = {};

    if (availablesStates[filterParams?.state ?? '']) {
      where = { ...where, state: availablesStates[filterParams?.state ?? ''] };
    }

    if (Object.keys(filterParams).length > 0) {
    }

    const cases = await Case.findAll({
      where,
    });
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
