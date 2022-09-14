const ShipmentStatusService = require('../services/shipment-status.service');

const service = new ShipmentStatusService();

async function getShipmentStatusController(_req, res, next) {
  try {
    const shipmentStatus = await service.findAll();
    res.json(shipmentStatus);
  } catch (error) {
    next(error);
  }
}

async function getShipmentStatusByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const shipmentStatus = await service.findOne(id);
    res.json(shipmentStatus);
  } catch (error) {
    next(error);
  }
}

async function createShipmentStatusController(req, res, next) {
  try {
    const { sub: userId } = req.user;
    const shipmentStatus = await service.create({
      ...req.body,
      createdById: userId,
    });
    res.json(shipmentStatus);
  } catch (error) {
    next(error);
  }
}

async function updateShipmentStatusController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const shipmentStatus = await service.update(id, body);
    res.json(shipmentStatus);
  } catch (error) {
    next(error);
  }
}

async function destroyShipmentStatusController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getShipmentStatusController,
  getShipmentStatusByIdController,
  createShipmentStatusController,
  updateShipmentStatusController,
  destroyShipmentStatusController,
};
