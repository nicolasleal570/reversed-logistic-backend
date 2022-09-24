'use strict';
const { PERMISSION_TABLE } = require('../models/permission.model');

const casesPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de cases',
    value: 'CASES_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description: 'Puede crear nueva información en el módulo de cases',
    value: 'CASES_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description: 'Puede actualizar información en el módulo de cases',
    value: 'CASES_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description: 'Puede eliminar información en el módulo de cases',
    value: 'CASES_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const flavorsPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de sabores de cerveza',
    value: 'FLAVORS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description:
      'Puede crear nueva información en el módulo de sabores de cerveza',
    value: 'FLAVORS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description:
      'Puede actualizar información en el módulo de sabores de cerveza',
    value: 'FLAVORS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description:
      'Puede eliminar información en el módulo de sabores de cerveza',
    value: 'FLAVORS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const ordersPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de órdenes de venta',
    value: 'ORDERS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description:
      'Puede crear nueva información en el módulo de órdenes de venta',
    value: 'ORDERS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description:
      'Puede actualizar información en el módulo de órdenes de venta',
    value: 'ORDERS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description: 'Puede eliminar información en el módulo de órdenes de venta',
    value: 'ORDERS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const shipmentsPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de envíos',
    value: 'SHIPMENTS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description: 'Puede crear nueva información en el módulo de envíos',
    value: 'SHIPMENTS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description: 'Puede actualizar información en el módulo de envíos',
    value: 'SHIPMENTS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description: 'Puede eliminar información en el módulo de envíos',
    value: 'SHIPMENTS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const trucksPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de transportes',
    value: 'TRUCKS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description: 'Puede crear nueva información en el módulo de transportes',
    value: 'TRUCKS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description: 'Puede actualizar información en el módulo de transportes',
    value: 'TRUCKS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description: 'Puede eliminar información en el módulo de transportes',
    value: 'TRUCKS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const cleanProcessPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de órdenes de limpieza',
    value: 'CLEAN_PROCESS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description:
      'Puede crear nueva información en el módulo de órdenes de limpieza',
    value: 'CLEAN_PROCESS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description:
      'Puede actualizar información en el módulo de órdenes de limpieza',
    value: 'CLEAN_PROCESS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description:
      'Puede eliminar información en el módulo de órdenes de limpieza',
    value: 'CLEAN_PROCESS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const cleanStepsPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de pasos de limpieza',
    value: 'CLEAN_STEPS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description:
      'Puede crear nueva información en el módulo de pasos de limpieza',
    value: 'CLEAN_STEPS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description:
      'Puede actualizar información en el módulo de pasos de limpieza',
    value: 'CLEAN_STEPS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description: 'Puede eliminar información en el módulo de pasos de limpieza',
    value: 'CLEAN_STEPS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const usersPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de empleados',
    value: 'USERS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description: 'Puede crear nueva información en el módulo de empleados',
    value: 'USERS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description: 'Puede actualizar información en el módulo de empleados',
    value: 'USERS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description: 'Puede eliminar información en el módulo de empleados',
    value: 'USERS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const customersPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de clientes y sucursales',
    value: 'CUSTOMERS_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description:
      'Puede crear nueva información en el módulo de clientes y sucursales',
    value: 'CUSTOMERS_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description:
      'Puede actualizar información en el módulo de clientes y sucursales',
    value: 'CUSTOMERS_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description:
      'Puede eliminar información en el módulo de clientes y sucursales',
    value: 'CUSTOMERS_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

const outOfStockPermissions = [
  {
    name: 'Lectura',
    description: 'Puede leer información del módulo de agotamiento',
    value: 'OUT_OF_STOCK_READ',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Crear',
    description: 'Puede crear nueva información en el módulo de agotamiento',
    value: 'OUT_OF_STOCK_CREATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Actualizar',
    description: 'Puede actualizar información en el módulo de agotamiento',
    value: 'OUT_OF_STOCK_UPDATE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
  {
    name: 'Eliminar',
    description: 'Puede eliminar información en el módulo de agotamiento',
    value: 'OUT_OF_STOCK_DELETE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by_id: 1,
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      PERMISSION_TABLE,
      [
        ...casesPermissions,
        ...flavorsPermissions,
        ...ordersPermissions,
        ...shipmentsPermissions,
        ...trucksPermissions,
        ...cleanProcessPermissions,
        ...cleanStepsPermissions,
        ...usersPermissions,
        ...customersPermissions,
        ...outOfStockPermissions,
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PERMISSION_TABLE, null, {});
  },
};
