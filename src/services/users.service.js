const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { sequelize } = require('../db/sequelize');

const { User } = sequelize.models;

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
    const users = await User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);

    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();

    return user;
  }
}

module.exports = UserService;
