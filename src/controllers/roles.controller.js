const RoleService = require('../services/roles.service');

const service = new RoleService();

async function getRolesController(_req, res, next) {
  try {
    const roles = await service.findAll();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

async function getRoleByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const role = await service.findOne(id);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

async function createRoleController(req, res, next) {
  try {
    const role = await service.create(req.body);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

async function updateRoleController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const role = await service.update(id, body);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

async function destroyRoleController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

async function addPermissionRoleController(req, res, next) {
  try {
    const { roleId, permissionId } = req.body;
    const response = await service.appendPermission(roleId, permissionId);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function addRoleUserController(req, res, next) {
  try {
    const { roleId, userId } = req.body;
    const response = await service.appendRoleToUser(userId, roleId);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRolesController,
  getRoleByIdController,
  createRoleController,
  updateRoleController,
  destroyRoleController,
  addPermissionRoleController,
  addRoleUserController,
};
