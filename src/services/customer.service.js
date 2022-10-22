const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const CustomerLocationService = require('./customer-location.service');

const { Customer } = sequelize.models;

class CustomersService {
  constructor() {
    this.customerLocationService = new CustomerLocationService();
  }

  async create(data) {
    const newCustomer = await Customer.create(data);
    return newCustomer.toJSON();
  }

  async createWithLocations(data) {
    const { locations, ...restData } = data;
    const newCustomer = await Customer.create(restData);

    await Promise.all(
      locations.map((location) =>
        this.customerLocationService.create({
          ...location,
          customerId: newCustomer.id,
        })
      )
    );

    return newCustomer.toJSON();
  }

  async findAll() {
    const customers = await Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await Customer.findByPk(id, {
      include: ['locations'],
    });

    if (!customer) {
      throw boom.notFound('Customer not found');
    }

    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);

    await customer.update(changes);

    return this.findOne(id);
  }

  async updateWithLocations(id, changes) {
    const { locations, ...restData } = changes;
    const customer = await this.findOne(id);

    await customer.update(restData);

    if (locations && locations.length > 0) {
      const locationsForUpdate = locations.filter((item) => item.id);
      const locationsForCreate = locations.filter((item) => !item.id);

      await Promise.all([
        ...locationsForUpdate.map((item) =>
          this.customerLocationService.update(item.id, item)
        ),
        ...locationsForCreate.map(({ id: _, ...item }) =>
          this.customerLocationService.create({
            ...item,
            customerId: Number.parseInt(id, 10),
          })
        ),
      ]);
    }

    return this.findOne(id);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return this.findOne(id);
  }
}

module.exports = CustomersService;
