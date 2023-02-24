const boom = require('@hapi/boom');
const dayjs = require('dayjs');
const { Op } = require('sequelize');
const { sequelize } = require('../db/sequelize');
const {
  queryBetweenDatesOfMonth,
  getStartAndFinishOfMonth,
} = require('../utils/queryBetweenDatesOfMonth');
const {
  Case,
  CaseContent,
  CasesStatusLog,
  Order,
  OrderStatus,
  Customer,
  CustomerLocation,
  Shipment,
  InventoryTurnoverAnalytic,
} = sequelize.models;

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
      locations.map((location) => {
        return Order.findAll({
          where: { customerLocationId: location.id },
          include: ['customerLocation'],
        });
      })
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

  async getBestCustomers({ month, year }) {
    const { firstDay, lastDay } = getStartAndFinishOfMonth(month, year);

    const [results] = await sequelize.query(`
        SELECT COUNT("foo"."customerId") AS "count", "foo"."customerId" as "customerId" FROM (
          SELECT "Order"."id", 
          "Order"."customer_location_id" AS "customerLocationId",
          "customerLocation"."customer_id" AS "customerId" 
          FROM "orders" AS "Order" 
          LEFT OUTER JOIN "customers_locations" AS "customerLocation" 
          ON "Order"."customer_location_id" = "customerLocation"."id"
          WHERE "Order"."purchase_date" BETWEEN '${firstDay.toISOString()}' AND '${lastDay.toISOString()}'
        ) foo
        GROUP BY "foo"."customerId"
        ORDER BY "count" DESC
        LIMIT 5
    `);

    const customers = await Promise.all(
      results.map((item) => Customer.findByPk(item.customerId))
    );

    return customers.map((customer, idx) => ({
      ...customer.toJSON(),
      totalOrders: Number.parseInt(results[idx]?.count, 10) || 0,
    }));
  }

  async getBestCustomersLocation({ month, year }) {
    const { firstDay, lastDay } = getStartAndFinishOfMonth(month, year);

    const [results] = await sequelize.query(`
        SELECT COUNT("foo"."customerLocationId") AS "count", "foo"."customerLocationId" FROM (
          SELECT "Order"."id", 
          "Order"."customer_location_id" AS "customerLocationId",
          "customerLocation"."customer_id" AS "customerId" 
          FROM "orders" AS "Order" 
          LEFT OUTER JOIN "customers_locations" AS "customerLocation" 
          ON "Order"."customer_location_id" = "customerLocation"."id"
          WHERE "Order"."purchase_date" BETWEEN '${firstDay.toISOString()}' AND '${lastDay.toISOString()}'
        ) foo
        GROUP BY "foo"."customerLocationId"
        ORDER BY "foo"."count" DESC
        LIMIT 5
    `);

    const locations = await Promise.all(
      results.map((item) =>
        CustomerLocation.findByPk(item.customerLocationId, {
          include: ['customer'],
        })
      )
    );

    return locations.map((location, idx) => ({
      ...location.toJSON(),
      totalOrders: Number.parseInt(results[idx]?.count, 10) || 0,
    }));
  }

  async getBestCaseContents({ month, year }) {
    const { firstDay, lastDay } = getStartAndFinishOfMonth(month, year);

    const [results] = await sequelize.query(`
      SELECT COUNT("foo"."caseContentId") AS "count", "foo"."caseContentId" AS "caseContentId" FROM (
        SELECT "Order"."id", 
        "items"."case_content_id" AS "caseContentId", 
        "items"."order_id" AS "orderId"
        FROM "orders" AS "Order" 
        LEFT OUTER JOIN "order_items" AS "items" ON "Order"."id" = "items"."order_id" 
        LEFT OUTER JOIN "cases_content" AS "items->caseContent" ON "items"."case_content_id" = "items->caseContent"."id"
        WHERE "Order"."purchase_date" BETWEEN '${firstDay.toISOString()}' AND '${lastDay.toISOString()}'
      ) foo
      GROUP BY "caseContentId"
      ORDER BY "count" DESC
      LIMIT 5
    `);

    const caseContents = await Promise.all(
      results.map((item) => CaseContent.findByPk(item.caseContentId))
    );

    return caseContents.map((content, idx) => ({
      ...content.toJSON(),
      usesCount: Number.parseInt(results[idx].count, 10) || 0,
    }));
  }

  async getBestCases({ month, year }) {
    const { firstDay, lastDay } = getStartAndFinishOfMonth(month, year);

    const [results] = await sequelize.query(`
      SELECT COUNT("foo"."caseId") AS "count", "foo"."caseId" AS "caseId" FROM (
        SELECT "Order"."id", 
        "items"."case_id" AS "caseId" 
        FROM "orders" AS "Order" 
        LEFT OUTER JOIN "order_items" AS "items" ON "Order"."id" = "items"."order_id"
        WHERE "Order"."purchase_date" BETWEEN '${firstDay.toISOString()}' AND '${lastDay.toISOString()}'
      ) foo
      GROUP BY "caseId"
      ORDER BY "count" DESC
      LIMIT 5
    `);

    const cases = await Promise.all(
      results.map((item) => Case.findByPk(item.caseId))
    );

    return cases.map((caseInfo, idx) => ({
      ...caseInfo.toJSON(),
      usesCount: Number.parseInt(results[idx].count, 10) || 0,
    }));
  }

  async getDeliveryAtTime({ month, year }) {
    const orders = await Order.findAll({
      where: {
        shipmentId: {
          [Op.not]: null,
        },
        purchaseDate: {
          ...queryBetweenDatesOfMonth(month, year),
          [Op.not]: null,
        },
      },
      order: [['expectedDeliveryDate', 'DESC']],
      include: ['shipment', 'assignedTo'],
    });

    const updatedOrders = orders
      .filter((item) => item.expectedDeliveryDate && item.deliveredAt)
      .map((order) => {
        const { expectedDeliveryDate, deliveredAt } = order.toJSON();

        const firstDate = dayjs(expectedDeliveryDate);
        const secondDate = dayjs(deliveredAt);
        const diff = firstDate.diff(secondDate, 'minutes');
        const units = diff < 0 ? 'minutos despues' : 'minutos antes';

        return {
          ...order.toJSON(),
          deliveryAtTime: `${diff} ${units}`,
        };
      });

    return updatedOrders;
  }

  async getShipmentsCount({ month, year }) {
    const shipments = await Shipment.findAll({
      where: {
        shipmentAt: {
          ...queryBetweenDatesOfMonth(month, year),
          [Op.not]: null,
        },
        deliveredAt: {
          ...queryBetweenDatesOfMonth(month, year),
          [Op.not]: null,
        },
      },
    });

    const shipmentsData = shipments.map((item) => item.toJSON());

    return {
      graph: {
        count: shipmentsData.length,
      },
      shipments,
    };
  }

  async getLateDeliveries({ month, year }) {
    const orders = await Order.findAll({
      where: {
        shipmentId: {
          [Op.not]: null,
        },
        purchaseDate: {
          ...queryBetweenDatesOfMonth(month, year),
        },
      },
    });

    const items = [];

    orders
      .filter((item) => item.expectedDeliveryDate && item.deliveredAt)
      .forEach((order) => {
        const firstDate = dayjs(order.expectedDeliveryDate);
        const secondDate = dayjs(order.deliveredAt);
        const diff = firstDate.diff(secondDate, 'minutes');

        if (diff < 0) {
          items.push(order.toJSON());
        }
      });

    const count = Math.round((items.length / orders.length) * 100);

    return { graph: { count: `${count}%` }, orders, lateDeliveries: items };
  }

  async getInventoryTurnover({ month, year }) {
    const baseDate = dayjs();
    const daysInMonth = baseDate.daysInMonth();

    const rawCurrentInventoryTurnover = await InventoryTurnoverAnalytic.findOne(
      {
        where: {
          createdAt: {
            ...queryBetweenDatesOfMonth(month, year),
            [Op.not]: null,
          },
        },
      }
    );

    if (!rawCurrentInventoryTurnover) {
      return {
        frequency: '0',
      };
    }

    const currentInventoryTurnover = rawCurrentInventoryTurnover.toJSON();

    return {
      ...currentInventoryTurnover,
      frequency: `${Number.parseFloat(
        currentInventoryTurnover.count / daysInMonth
      ).toFixed(2)} rotaciones por día`,
    };
  }

  async getStockRotation() {
    const cases = await Case.findAll();
    const logs = await CasesStatusLog.findAll({
      where: {
        status: 'AVAILABLE',
      },
      order: [['createdAt', 'ASC']],
    });

    let count = 0;
    let leftSlice = 0;
    let rightSlice = cases.length;
    const arr = [];

    cases.forEach(() => {
      arr.push(logs.slice(leftSlice, rightSlice));
      leftSlice += cases.length;
      rightSlice += cases.length;
    });

    arr.forEach((item) => {
      let done = [];

      item.forEach((obj) => {
        done.push(obj.caseId);
      });

      if (done.length === cases.length) {
        count += 1;
      }
    });

    return { graph: { count } };
  }
}

module.exports = AnalyticsService;
