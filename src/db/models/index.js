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
const { Case, CaseSchema } = require('./case.model');
const { CaseContent, CaseContentSchema } = require('./case-content.model');
const { OrderStatus, OrderStatusSchema } = require('./order-status.model');
const { OrderItem, OrderItemSchema } = require('./order-item.model');
const { Order, OrderSchema } = require('./order.model');
const { Truck, TruckSchema } = require('./truck.model');
const { Shipment, ShipmentSchema } = require('./shipment.model');
const { ProcessStep, ProcessStepSchema } = require('./process-step.model');
const {
  CleanProcessOrder,
  CleanProcessOrderSchema,
} = require('./clean-process-order.model');
const {
  CaseCleanProcessStep,
  CaseCleanProcessStepSchema,
} = require('./case-clean-process-step.model');

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
  CleanProcessOrder.init(
    CleanProcessOrderSchema,
    CleanProcessOrder.config(sequelize)
  );
  CaseCleanProcessStep.init(
    CaseCleanProcessStepSchema,
    CaseCleanProcessStep.config(sequelize)
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
  CleanProcessOrder.associate(sequelize.models);
  CaseCleanProcessStep.associate(sequelize.models);

  try {
    await sequelize.authenticate();
    console.log('DB connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
  }
}

module.exports = {
  setupModels,
};
