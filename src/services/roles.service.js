const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { Role } = sequelize.models;

class RolesService {
  constructor() {}

  async create(data) {
    const newRole = await Role.create(data);
    return newRole.toJSON();
  }

  async findAll() {
    const roles = await Role.findAll({ include: ['createdBy'] });
    return roles;
  }

  async findOne(id) {
    const role = await Role.findByPk(id, { include: ['createdBy'] });

    if (!role) {
      throw boom.notFound('Role not found');
    }

    return role;
  }

  async update(id, changes) {
    const role = await this.findOne(id);
    const res = await role.update(changes);

    return res;
  }

  async delete(id) {
    const role = await this.findOne(id);
    await role.destroy();

    return role;
  }
}

module.exports = RolesService;
