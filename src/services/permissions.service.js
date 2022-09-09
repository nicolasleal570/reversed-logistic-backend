const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { Permission } = sequelize.models;

class PermissionsService {
  constructor() {}

  async create(data) {
    const newPermission = await Permission.create(data);
    return newPermission.toJSON();
  }

  async findAll() {
    const permissions = await Permission.findAll({ include: ['createdBy'] });
    return permissions;
  }

  async findOne(id) {
    const permission = await Permission.findByPk(id, {
      include: ['createdBy'],
    });

    if (!permission) {
      throw boom.notFound('Permission not found');
    }

    return permission;
  }

  async findOneByWhere(where) {
    const permission = await Permission.findOne({
      where,
    });

    if (!permission) {
      throw boom.notFound('Permission not found');
    }

    return permission.toJSON();
  }

  async update(id, changes) {
    const permission = await this.findOne(id);
    const res = await permission.update(changes);

    return res;
  }

  async delete(id) {
    const permission = await this.findOne(id);
    await permission.destroy();

    return permission;
  }
}

module.exports = PermissionsService;
