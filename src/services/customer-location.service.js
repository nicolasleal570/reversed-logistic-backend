const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');

const { CustomerLocation } = sequelize.models;

class CustomerLocationsService {
  constructor() {}

  async create(data) {
    const newCustomerLocation = await CustomerLocation.create({
      ...data,
      password: data?.password || 'password',
    });
    return newCustomerLocation.toJSON();
  }

  async findAll() {
    const customers = await CustomerLocation.findAll({ include: ['customer'] });
    return customers;
  }

  async findByEmail(email) {
    const location = await CustomerLocation.findOne({
      where: { email },
    });
    return location?.toJSON();
  }

  async findOne(id, disabledValidation) {
    const customerLocation = await CustomerLocation.findByPk(id, {
      include: ['customer'],
    });

    if (!customerLocation && !disabledValidation) {
      throw boom.notFound('Customer Location not found');
    }

    return customerLocation;
  }

  async findByCustomerLocation(customerId) {
    const customerLocation = await CustomerLocation.findAll({
      where: {
        customerId,
      },
    });

    if (!customerLocation) {
      throw boom.notFound('Customer Location not found');
    }

    return customerLocation;
  }

  async update(id, changes) {
    const customerLocation = await this.findOne(id);
    const res = await customerLocation.update(changes);

    return res;
  }

  async delete(id) {
    const customerLocation = await this.findOne(id);
    await customerLocation.destroy();

    return customerLocation;
  }
}

module.exports = CustomerLocationsService;
