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
const { ProcessStep, ProcessStepSchema } = require('./process-step.model');
const { CaseProcess, CaseProcessSchema } = require('./case-process.model');
const { OrderStatus, OrderStatusSchema } = require('./order-status.model');
const { OrderItem, OrderItemSchema } = require('./order-item.model');
const { Order, OrderSchema } = require('./order.model');
const { Truck, TruckSchema } = require('./truck.model');
const { Shipment, ShipmentSchema } = require('./shipment.model');

function setupModels(sequelize) {
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
  ProcessStep.init(ProcessStepSchema, ProcessStep.config(sequelize));
  CaseProcess.init(CaseProcessSchema, CaseProcess.config(sequelize));
  OrderStatus.init(OrderStatusSchema, OrderStatus.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderItem.init(OrderItemSchema, OrderItem.config(sequelize));
  Truck.init(TruckSchema, Truck.config(sequelize));
  Shipment.init(ShipmentSchema, Shipment.config(sequelize));

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
  ProcessStep.associate(sequelize.models);
  CaseProcess.associate(sequelize.models);
  OrderStatus.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderItem.associate(sequelize.models);
  Truck.associate(sequelize.models);
  Shipment.associate(sequelize.models);
}

module.exports = {
  setupModels,
};
