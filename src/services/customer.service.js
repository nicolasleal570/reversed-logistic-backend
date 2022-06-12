const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const UserService = require('./users.service');

const { Customer } = sequelize.models;

class CustomersService {
  constructor() {
    this.userService = new UserService();
  }

  async create(data) {
    const newCustomer = await Customer.create(data);
    return newCustomer.toJSON();
  }

  async findAll() {
    const customers = await Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound('Customer not found');
    }

    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const res = await customer.update(changes);

    return res;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return customer;
  }
}

module.exports = CustomersService;
