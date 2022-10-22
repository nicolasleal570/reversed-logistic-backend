const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const { Case, CaseContent, Order, OrderStatus, Customer } = sequelize.models;

class AnalyticsService {
  constructor() {}

  async caseMostUsed() {
    let cases = await Case.findAll({
      include: [
        {
          model: Order,
          as: 'orders',
          include: [
            {
              model: OrderStatus,
              as: 'orderStatus',
              where: {
                value: 'SHIPMENT_DONE',
              },
            },
          ],
        },
      ],
    });

    cases = [...cases.sort((a, b) => b.orders.length - a.orders.length)]
      .slice(0, 5)
      .filter(({ orders }) => orders.length > 0);

    return cases;
  }

  async getOrdersByCustomerLocations({ customerId }) {
    const customer = await Customer.findByPk(customerId, {
      include: ['locations'],
    });

    if (!customer) {
      throw boom.notFound('Ese cliente no existe');
    }

    const { locations, companyName: customerName } = customer.toJSON();

    const orders = await Promise.all(
      locations.map((location) =>
        Order.findAll({
          where: { customerLocationId: location.id },
          include: ['customerLocation'],
        })
      )
    );

    const items = [];
    orders.forEach((ordersArr) => items.push(...ordersArr));

    let dict = {};

    items
      .map((order) => order.toJSON())
      .forEach(({ customerLocation: { name } }) => {
        if (dict[name]) {
          dict = {
            ...dict,
            [name]: {
              ...dict[name],
              count: dict[name].count + 1,
            },
          };
        } else {
          dict = {
            ...dict,
            [name]: {
              name,
              count: 1,
            },
          };
        }
      });

    return {
      name: customerName,
      data: Object.values(dict),
    };
  }

  async getBestCustomers() {
    const [results] = await sequelize.query(`
      SELECT * FROM (
    SELECT COUNT("foo"."customerId") AS "count", "foo"."customerId" as "customerId" FROM (
        SELECT "CustomerLocation"."id", 
        "CustomerLocation"."name", 
        "CustomerLocation"."customer_id" AS "customerId", 
        "orders"."id" AS "order_id", 
        "orders"."order_status_id" AS "order_status_id"
        FROM "customers_locations" AS "CustomerLocation" 
        LEFT OUTER JOIN "orders" AS "orders" ON "CustomerLocation"."id" = "orders"."customer_location_id"
    ) foo
    GROUP BY "foo"."customerId"
) "counts"
WHERE "counts"."count" > 1
    `);

    const customers = await Promise.all(
      results.map((item) => Customer.findByPk(item.customerId))
    );

    return customers.map((customer, idx) => ({
      ...customer.toJSON(),
      Total: Number.parseInt(results[idx]?.count, 10) || 0,
    }));
  }

  async getBestCaseContents() {
    const [results] = await sequelize.query(`
      SELECT COUNT("foo"."caseContentId"), "foo"."caseContentId" AS "caseContentId" FROM (
        SELECT "Order"."id", 
        "items"."case_content_id" AS "caseContentId", 
        "items"."order_id" AS "orderId"
        FROM "orders" AS "Order" 
        LEFT OUTER JOIN "order_items" AS "items" ON "Order"."id" = "items"."order_id" 
        LEFT OUTER JOIN "cases_content" AS "items->caseContent" ON "items"."case_content_id" = "items->caseContent"."id"
      ) foo
      GROUP BY "caseContentId"
    `);

    const caseContents = await Promise.all(
      results.map((item) => CaseContent.findByPk(item.caseContentId))
    );

    return caseContents.map((content, idx) => ({
      ...content.toJSON(),
      Ventas: Number.parseInt(results[idx].count, 10) || 0,
    }));
  }

  async getBestCases() {
    const [results] = await sequelize.query(`
      SELECT COUNT("foo"."caseId"), "foo"."caseId" AS "caseId" FROM (
        SELECT "Order"."id", 
        "items"."case_id" AS "caseId" 
        FROM "orders" AS "Order" 
        LEFT OUTER JOIN "order_items" AS "items" ON "Order"."id" = "items"."order_id"
      ) foo
      GROUP BY "caseId"
    `);

    const cases = await Promise.all(
      results.map((item) => Case.findByPk(item.caseId))
    );

    return cases.map((caseInfo, idx) => ({
      ...caseInfo.toJSON(),
      Ventas: Number.parseInt(results[idx].count, 10) || 0,
    }));
  }
}

module.exports = AnalyticsService;
