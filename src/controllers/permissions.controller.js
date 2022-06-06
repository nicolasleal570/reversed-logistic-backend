const PermissionsService = require('../services/permissions.service');

const service = new PermissionsService();

async function getPermissionsController(_req, res, next) {
  try {
    const permissions = await service.findAll();
    res.json(permissions);
  } catch (error) {
    next(error);
  }
}

async function getPermissionByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const permission = await service.findOne(id);
    res.json(permission);
  } catch (error) {
    next(error);
  }
}

async function createPermissionController(req, res, next) {
  try {
    const permission = await service.create(req.body);
    res.json(permission);
  } catch (error) {
    next(error);
  }
}

async function updatePermissionController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const permission = await service.update(id, body);
    res.json(permission);
  } catch (error) {
    next(error);
  }
}

async function destroyPermissionController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPermissionsController,
  getPermissionByIdController,
  createPermissionController,
  updatePermissionController,
  destroyPermissionController,
};
