const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { sequelize } = require('../db/sequelize');
const RoleService = require('./roles.service');

const rolesService = new RoleService();

const { User, Role } = sequelize.models;

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hash,
    });

    const { _password, ...rest } = newUser.toJSON();

    return rest;
  }

  async findAll() {
    const users = await User.findAll({
      attributes: ['id', 'fullName', 'email', 'phone'],
      include: ['roles'],
    });
    return users;
  }

  async findOne(id) {
    const user = await User.findByPk(id, {
      attributes: ['id', 'fullName', 'email', 'phone'],
      include: [{ model: Role, as: 'roles', include: ['permissions'] }],
    });

    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
      include: ['roles'],
    });

    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);

    const { roleId, ...rest } = changes;
    const userData = user.toJSON();

    if (userData.roles[0].id !== Number.parseInt(roleId, 10)) {
      await rolesService.detachRoleToUser(userData.id, user.roles[0].id);
      await rolesService.appendRoleToUser(userData.id, roleId);
    }

    const res = await user.update(rest);

    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();

    return user;
  }

  async getUserRoles(userId) {}
}

module.exports = UserService;
