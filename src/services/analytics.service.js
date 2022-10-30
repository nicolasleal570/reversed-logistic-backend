const boom = require('@hapi/boom');
const dayjs = require('dayjs');
const { Op } = require('sequelize');
const { sequelize } = require('../db/sequelize');
const {
  Case,
  CaseContent,
  CasesStatusLog,
  Order,
  OrderStatus,
  Customer,
  Shipment,
  Truck,
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

  async getDeliveryAtTime({ driverId }) {
    const trucks = await Truck.findAll({
      where: { userId: driverId },
      include: [
        {
          model: Shipment,
          as: 'shipments',
          include: ['orders'],
        },
      ],
    });

    if (!trucks.length) {
      throw boom.notFound('No hay transportes asociados a este usuario');
    }

    const ordersItems = [];
    trucks
      .map((item) => item.toJSON())
      .forEach((truck) => {
        const { shipments } = truck;

        shipments.forEach((shipment) => {
          const { orders, ...restShipment } = shipment;

          // Shipment is set delivered at date
          if (restShipment.deliveredAt) {
            orders.forEach((order) => {
              if (order.expectedDeliveryDate) {
                ordersItems.push({
                  order,
                  shipment: restShipment,
                });
              }
            });
          }
        });
      });

    if (!ordersItems.length) {
      throw boom.notFound('Este conductor no tiene envíos');
    }

    let format = 'minutos';
    let avg =
      ordersItems.reduce((acc, curr) => {
        const { order, shipment } = curr;
        const first = dayjs(order.expectedDeliveryDate);
        const second = dayjs(shipment.deliveredAt);

        return first.diff(second, 'minute');
      }, 0) / ordersItems.length;

    // Hours
    if (avg > 60) {
      avg = Math.round(avg / 60);
      format = 'houras';
    }

    // Days
    if (avg > 24) {
      avg = Math.round(avg / 24);
      format = 'días';
    }

    return { count: { avg, format }, trucks };
  }

  async getShipmentsCount({ month: monthNumber }) {
    const baseDate = dayjs().month(monthNumber);
    const daysInMonth = baseDate.daysInMonth();
    const firstDay = baseDate.clone().date(1).hour(0);
    const lastDay = baseDate.clone().date(daysInMonth).hour(23);

    const shipments = await Shipment.findAll({
      where: {
        deliveredAt: {
          [Op.not]: null,
          [Op.between]: [firstDay.toDate(), lastDay.toDate()],
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

  async getLateDeliveries() {
    const shipments = await Shipment.findAll({
      include: ['orders'],
    });

    const ordersItems = [];
    shipments
      .map((item) => item.toJSON())
      .forEach((shipment) => {
        const { orders, ...restShipment } = shipment;

        // Shipment is set delivered at date
        if (restShipment.deliveredAt) {
          orders.forEach((order) => {
            if (order.expectedDeliveryDate) {
              ordersItems.push({
                order,
                shipment: restShipment,
              });
            }
          });
        }
      });

    const count = ordersItems
      .map(({ order, shipment }) => {
        const expected = dayjs(order.expectedDeliveryDate);
        const real = dayjs(shipment.deliveredAt);

        return expected.diff(real, 'hour');
      })
      .filter((item) => item <= 0);

    return { graph: { count: count.length }, ordersItems };
  }

  async getInventoryTurnover() {
    const cases = await Case.findAll();
    const logs = await CasesStatusLog.findAll({
      where: {
        status: 'SHIPMENT_DONE',
      },
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
