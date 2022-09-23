const boom = require('@hapi/boom');
const { sequelize } = require('../db/sequelize');
const { slugify } = require('../utils/slugify');
const PermissionsService = require('../services/permissions.service');

const { Role, RolePermission, UserRoles, User } = sequelize.models;

const permissionsService = new PermissionsService();

class RolesService {
  constructor() {}

  async create(data) {
    let newRole = await Role.create({
      ...data,
      value: slugify(data.name),
    });

    newRole = newRole.toJSON();

    if (data.permissions && data.permissions.length > 0) {
      const permissions = await Promise.all(
        data.permissions.map((item) =>
          permissionsService.findOneByWhere({ value: item[0].toUpperCase() })
        )
      );

      await Promise.all(
        permissions.map((permission) =>
          this.appendPermission(newRole.id, permission.id)
        )
      );
    }

    return newRole;
  }

  async findAll() {
    const roles = await Role.findAll({
      order: [['id', 'ASC']],
      include: ['createdBy', 'permissions'],
    });
    return roles;
  }

  async findOne(id) {
    const role = await Role.findByPk(id, {
      include: ['createdBy', 'permissions'],
    });

    if (!role) {
      throw boom.notFound('Role not found');
    }

    return role;
  }

  async update(id, changes) {
    const role = await this.findOne(id);
    const res = await role.update(changes);

    return res;
  }

  async delete(id) {
    const role = await this.findOne(id);
    await role.destroy();

    return role;
  }

  async appendRoleToUser(userId, roleId) {
    const role = await (await this.findOne(roleId)).toJSON();
    const user = await User.findByPk(userId);

    if (!user) {
      throw boom.notFound('Este usuario no existe');
    }

    const newUserWithRole = await UserRoles.create({
      roleId: role.id,
      userId: user.toJSON().id,
    });

    return newUserWithRole.toJSON();
  }

  async detachRoleToUser(userId, roleId) {
    const role = await this.findOne(roleId);
    const user = await User.findByPk(userId);

    if (!user) {
      throw boom.notFound('Este usuario no existe');
    }

    const userRole = await UserRoles.findOne({
      where: {
        roleId: role.toJSON().id,
        userId: user.toJSON().id,
      },
    });

    if (!userRole) {
      throw boom.notFound('Este usuario no tiene este rol asignado');
    }

    await userRole.destroy();

    return userRole.toJSON();
  }

  async appendPermission(roleId, permissionId) {
    await this.findOne(roleId);

    const newRolePermission = await RolePermission.create({
      roleId,
      permissionId,
    });

    return newRolePermission.toJSON();
  }
}

module.exports = RolesService;
