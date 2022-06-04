const UserService = require('../services/users.service');

const service = new UserService();

async function getUsersController(_req, res, next) {
  try {
    const users = await service.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUserByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function createUserController(req, res, next) {
  try {
    const { body } = req;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

async function updateUserController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await service.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function destroyUserController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  destroyUserController,
};
