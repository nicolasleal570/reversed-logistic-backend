const { User, UserSchema } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');
const { Permission, PermissionSchema } = require('./permission.model');
const {
  RolePermission,
  RolePermissionSchema,
} = require('./role-permission.model');
const { UserRoles, UserRolesSchema } = require('./user-roles.model');
const { Customer, CustomerSchema } = require('./customer.model');
const {
  CustomerLocation,
  CustomerLocationSchema,
} = require('./customer-location.model');
const {
  Case,
  CaseSchema,
  orderStateToCaseState,
  outOfStockOrderStateToCaseState,
} = require('./case.model');
const { CaseContent, CaseContentSchema } = require('./case-content.model');
const { OrderStatus, OrderStatusSchema } = require('./order-status.model');
const { OrderItem, OrderItemSchema } = require('./order-item.model');
const { Order, OrderSchema } = require('./order.model');
const { Truck, TruckSchema } = require('./truck.model');
const { Shipment, ShipmentSchema } = require('./shipment.model');
const { ProcessStep, ProcessStepSchema } = require('./process-step.model');
const {
  CleanProcessStatus,
  CleanProcessStatusSchema,
} = require('./clean-process-status.model');
const {
  CleanProcessOrder,
  CleanProcessOrderSchema,
} = require('./clean-process-order.model');
const {
  CaseCleanProcessStep,
  CaseCleanProcessStepSchema,
} = require('./case-clean-process-step.model');
const {
  ShipmentStatus,
  ShipmentStatusSchema,
} = require('./shipment-status.model');
const {
  OutOfStockStatus,
  OutOfStockStatusSchema,
} = require('./out-of-stock-status.model');
const {
  OutOfStockOrder,
  OutOfStockOrderSchema,
} = require('./out-of-stock-order.model');
const {
  OutOfStockItem,
  OutOfStockItemSchema,
} = require('./out-of-stock-item.model');
const { CasesStatusLog, CasesStatusLogsSchema } = require('./case-status-log');
const {
  InventoryTurnoverAnalytic,
  InventoryTurnoverAnalyticSchema,
} = require('./inventory-turnover-analytic.model');

async function setupModels(sequelize) {
  // Handle models init
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Permission.init(PermissionSchema, Permission.config(sequelize));
  RolePermission.init(RolePermissionSchema, RolePermission.config(sequelize));
  UserRoles.init(UserRolesSchema, UserRoles.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  CustomerLocation.init(
    CustomerLocationSchema,
    CustomerLocation.config(sequelize)
  );
  Case.init(CaseSchema, Case.config(sequelize));
  CaseContent.init(CaseContentSchema, CaseContent.config(sequelize));
  OrderStatus.init(OrderStatusSchema, OrderStatus.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderItem.init(OrderItemSchema, OrderItem.config(sequelize));
  Truck.init(TruckSchema, Truck.config(sequelize));
  Shipment.init(ShipmentSchema, Shipment.config(sequelize));
  ProcessStep.init(ProcessStepSchema, ProcessStep.config(sequelize));
  CleanProcessStatus.init(
    CleanProcessStatusSchema,
    CleanProcessStatus.config(sequelize)
  );
  CleanProcessOrder.init(
    CleanProcessOrderSchema,
    CleanProcessOrder.config(sequelize)
  );
  CaseCleanProcessStep.init(
    CaseCleanProcessStepSchema,
    CaseCleanProcessStep.config(sequelize)
  );
  ShipmentStatus.init(ShipmentStatusSchema, ShipmentStatus.config(sequelize));
  OutOfStockStatus.init(
    OutOfStockStatusSchema,
    OutOfStockStatus.config(sequelize)
  );
  OutOfStockOrder.init(
    OutOfStockOrderSchema,
    OutOfStockOrder.config(sequelize)
  );
  OutOfStockItem.init(OutOfStockItemSchema, OutOfStockItem.config(sequelize));
  CasesStatusLog.init(CasesStatusLogsSchema, CasesStatusLog.config(sequelize));
  InventoryTurnoverAnalytic.init(
    InventoryTurnoverAnalyticSchema,
    InventoryTurnoverAnalytic.config(sequelize)
  );

  // Handle models associations
  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  Permission.associate(sequelize.models);
  RolePermission.associate(sequelize.models);
  UserRoles.associate(sequelize.models);
  Customer.associate(sequelize.models);
  CustomerLocation.associate(sequelize.models);
  Case.associate(sequelize.models);
  CaseContent.associate(sequelize.models);
  OrderStatus.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderItem.associate(sequelize.models);
  Truck.associate(sequelize.models);
  Shipment.associate(sequelize.models);
  ProcessStep.associate(sequelize.models);
  CleanProcessStatus.associate(sequelize.models);
  CleanProcessOrder.associate(sequelize.models);
  CaseCleanProcessStep.associate(sequelize.models);
  ShipmentStatus.associate(sequelize.models);
  OutOfStockStatus.associate(sequelize.models);
  OutOfStockOrder.associate(sequelize.models);
  OutOfStockItem.associate(sequelize.models);
  CasesStatusLog.associate(sequelize.models);
  InventoryTurnoverAnalytic.associate(sequelize.models);

  setupHooks(sequelize);

  try {
    await sequelize.authenticate();
    console.log('DB connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
  }
}

function setupHooks(_sequelize) {
  Shipment.addHook(
    'afterUpdate',
    'updateOrdersStatusWhenShipmentAtHasChange',
    async (shipment) => {
      // Update orders status when shipmentAt date change
      if (
        shipment.shipmentAt &&
        !Number.isNaN(Date.parse(shipment.shipmentAt)) &&
        shipment.statusId === 2 &&
        Number.isNaN(Date.parse(shipment.deliveredAt))
      ) {
        await Promise.all(
          shipment.orders.map((order) =>
            Order.update({ orderStatusId: 5 }, { where: { id: order.id } })
          )
        );

        // Update cases state
        const orderItemsPromises = [];
        shipment.orders.forEach((order) => {
          orderItemsPromises.push(
            OrderItem.findAll({ where: { orderId: order.id } })
          );
        });
        const orderItems = await Promise.all(orderItemsPromises);
        await Promise.all(
          [].concat(...orderItems).map((item) => {
            return Case.update(
              { state: orderStateToCaseState['5'] },
              { where: { id: item.caseId } }
            );
          })
        );

        await Promise.all(
          [].concat(...orderItems).map((item) => {
            return CasesStatusLog.create({
              status: orderStateToCaseState['5'],
              caseId: item.caseId,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          })
        );

        return;
      }

      // Update orders status when deliveredAt date change
      if (
        shipment.deliveredAt &&
        shipment.shipmentAt &&
        !Number.isNaN(Date.parse(shipment.shipmentAt)) &&
        !Number.isNaN(Date.parse(shipment.deliveredAt)) &&
        shipment.statusId === 3
      ) {
        await Promise.all(
          shipment.orders.map((order) =>
            Order.update({ orderStatusId: 6 }, { where: { id: order.id } })
          )
        );

        // Update cases state
        const orderItemsPromises = [];
        shipment.orders.forEach((order) =>
          orderItemsPromises.push(
            OrderItem.findAll({ where: { orderId: order.id } })
          )
        );
        const orderItems = await Promise.all(orderItemsPromises);
        await Promise.all(
          [].concat(...orderItems).map((item) => {
            return Case.update(
              { state: orderStateToCaseState['6'] },
              { where: { id: item.caseId } }
            );
          })
        );
        await Promise.all(
          [].concat(...orderItems).map((item) => {
            return CasesStatusLog.create({
              status: orderStateToCaseState['6'],
              caseId: item.caseId,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          })
        );

        return;
      }

      // Set shippping orders on WAITING_SHIPMENT status
      const arr = shipment.orders.filter((order) => order.orderStatusId > 4);
      await Promise.all(
        arr.map((order) =>
          Order.update({ orderStatusId: 4 }, { where: { id: order.id } })
        )
      );

      // Update cases state
      const orderItemsPromises = [];
      shipment.orders.forEach((order) =>
        orderItemsPromises.push(
          OrderItem.findAll({ where: { orderId: order.id } })
        )
      );
      const orderItems = await Promise.all(orderItemsPromises);
      await Promise.all(
        []
          .concat(...orderItems)
          .map((item) =>
            Case.update(
              { state: orderStateToCaseState['4'] },
              { where: { id: item.caseId } }
            )
          )
      );

      await Promise.all(
        [].concat(...orderItems).map((item) =>
          CasesStatusLog.create({
            status: orderStateToCaseState['4'],
            caseId: item.caseId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        )
      );
    }
  );

  Order.addHook(
    'afterUpdate',
    'updateCasesStatusWhenOrderIsUpdated',
    async (order) => {
      const orderItems = await OrderItem.findAll({
        where: { orderId: order.id },
      });

      const promises = [];

      orderItems.forEach((item) => {
        promises.push(
          Case.update(
            { state: orderStateToCaseState[order.orderStatusId] ?? 1 },
            { where: { id: item.caseId } }
          ),
          CasesStatusLog.create({
            status: orderStateToCaseState[order.orderStatusId],
            caseId: item.caseId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        );
      });

      await Promise.all(promises);
    }
  );

  OutOfStockOrder.addHook(
    'afterUpdate',
    'updateCasesStatusWhenOutOfStockOrderIsUpdated',
    async (order) => {
      const orderItems = await OutOfStockItem.findAll({
        where: { outOfStockOrderId: order.id },
      });

      const promises = [];

      orderItems.forEach((item) => {
        promises.push(
          Case.update(
            {
              state: outOfStockOrderStateToCaseState[order.statusId],
            },
            { where: { id: item.caseId } }
          ),
          CasesStatusLog.create({
            status: outOfStockOrderStateToCaseState[order.statusId],
            caseId: item.caseId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        );
      });

      await Promise.all(promises);
    }
  );

  Case.addHook(
    'afterCreate',
    'createCaseStatusLogAfterCaseCreate',
    async (caseInfo) => {
      await CasesStatusLog.create({
        status: caseInfo.state,
        caseId: caseInfo.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  );

  Case.addHook(
    'afterUpdate',
    'createCaseStatusLogAfterCaseUpdate',
    async (caseInfo) => {
      await CasesStatusLog.create({
        status: caseInfo.state,
        caseId: caseInfo.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  );
}

module.exports = {
  setupModels,
  setupHooks,
};
