const express = require('express');
const { faker } = require('@faker-js/faker');
const passport = require('passport');
const { sequelize } = require('../db/sequelize');
const OrderService = require('../services/orders.service');

const { Case } = sequelize.models;

const ordersService = new OrderService();

const router = express.Router();

router.get(
  '/generate-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const {
      sub: { id: userId },
    } = req.user;

    const ordersLength = new Array(10).fill(null);

    const casesInfo = await Case.findAll();

    const casesList = casesInfo.map((item) => item.toJSON());

    const orders = await Promise.all(
      ordersLength.map((_, index) => {
        const payload = {
          createdById: userId,
          customerLocationId: faker.datatype.number({
            min: 1,
            max: 10,
          }),
          items: [
            {
              caseId: ordersLength.length - index,
              caseContentId: faker.datatype.number({
                min: 1,
                max: 20,
              }),
              quantity: casesList.find((info) => info.id === index + 1)?.volume,
            },
          ],
        };

        return ordersService.create(payload);
      })
    );

    res.json({
      orders,
    });
  }
);

module.exports = router;
