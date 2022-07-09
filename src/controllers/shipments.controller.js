const ShipmentService = require('../services/shipments.service');

const service = new ShipmentService();

async function getShipmentsController(_req, res, next) {
  try {
    const shipments = await service.findAll();
    res.json(shipments);
  } catch (error) {
    next(error);
  }
}

async function getShipmentByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const shipment = await service.findOne(id);
    res.json(shipment);
  } catch (error) {
    next(error);
  }
}

async function createShipmentController(req, res, next) {
  try {
    const shipment = await service.create(req.body);
    res.json(shipment);
  } catch (error) {
    next(error);
  }
}

async function updateShipmentController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const shipment = await service.update(id, body);
    res.json(shipment);
  } catch (error) {
    next(error);
  }
}

async function destroyShipmentController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getShipmentsController,
  getShipmentByIdController,
  createShipmentController,
  updateShipmentController,
  destroyShipmentController,
};
