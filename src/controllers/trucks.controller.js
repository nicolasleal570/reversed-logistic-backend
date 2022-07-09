const TruckService = require('../services/trucks.service');

const service = new TruckService();

async function getTrucksController(_req, res, next) {
  try {
    const trucks = await service.findAll();
    res.json(trucks);
  } catch (error) {
    next(error);
  }
}

async function getTruckByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const truck = await service.findOne(id);
    res.json(truck);
  } catch (error) {
    next(error);
  }
}

async function createTruckController(req, res, next) {
  try {
    const truck = await service.create(req.body);
    res.json(truck);
  } catch (error) {
    next(error);
  }
}

async function updateTruckController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const truck = await service.update(id, body);
    res.json(truck);
  } catch (error) {
    next(error);
  }
}

async function destroyTruckController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTrucksController,
  getTruckByIdController,
  createTruckController,
  updateTruckController,
  destroyTruckController,
};
