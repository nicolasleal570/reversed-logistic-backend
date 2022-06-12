const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { CaseContent } = sequelize.models;

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
    const caseContent = await CaseContent.findByPk(id);

    if (!caseContent) {
      throw boom.notFound('CaseContent not found');
    }

    return caseContent;
  }

  async update(id, changes) {
    const caseContent = await this.findOne(id);
    const res = await caseContent.update(changes);

    return res;
  }

  async delete(id) {
    const caseContent = await this.findOne(id);
    await caseContent.destroy();

    return caseContent;
  }
}

module.exports = CaseContentsService;
