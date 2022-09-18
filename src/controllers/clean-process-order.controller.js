const CleanProcessOrderService = require('../services/clean-process-orders.service');
const CaseCleanProcessStepsService = require('../services/case-clean-process-steps.service');

const service = new CleanProcessOrderService();
const caseCleanProcessStepsService = new CaseCleanProcessStepsService();

async function getCleanProcessOrdersController(_req, res, next) {
  try {
    const cleanProcessOrders = await service.findAll();
    res.json(cleanProcessOrders);
  } catch (error) {
    next(error);
  }
}

async function getCleanProcessOrderByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const cleanProcessOrder = await service.findOne(id);
    res.json(cleanProcessOrder);
  } catch (error) {
    next(error);
  }
}

async function createCleanProcessOrderController(req, res, next) {
  try {
    const {
      sub: { id: userId, isLocation },
    } = req.user;
    const cleanProcessOrder = await service.create({
      ...req.body,
      createdById: userId,
    });
    res.json(cleanProcessOrder);
  } catch (error) {
    next(error);
  }
}

async function createFullCleanProcessOrderController(req, res, next) {
  try {
    const {
      sub: { id: userId, isLocation },
    } = req.user;
    const { steps, ...restData } = req.body;

    // Create clean process order
    let cleanProcessOrder = await service.create({
      ...restData,
      createdById: userId,
    });

    // create case clean process steps
    const stepsCreated = await Promise.all(
      steps.map((step, idx) =>
        caseCleanProcessStepsService.create({
          order: idx + 1,
          cleanProcessOrderId: cleanProcessOrder.id,
          processStepId: step.processStepId,
          createdById: userId,
        })
      )
    );

    res.json({ cleanProcessOrder, steps: stepsCreated });
  } catch (error) {
    next(error);
  }
}

async function updateCleanProcessOrderController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const cleanProcessOrder = await service.update(id, body);
    res.json(cleanProcessOrder);
  } catch (error) {
    next(error);
  }
}

async function destroyCleanProcessOrderController(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

async function startCleanProcessOrderController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedCleanProcess = await service.startCleanProcess(id);
    res.json(updatedCleanProcess);
  } catch (error) {
    next(error);
  }
}

async function stepDoneCleanProcessOrderController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedCleanProcess = await service.setStepDone(id, req.body);
    res.json(updatedCleanProcess);
  } catch (error) {
    next(error);
  }
}

async function doneCleanProcessOrderController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedCleanProcess = await service.markAsDone(id);
    res.json(updatedCleanProcess);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCleanProcessOrdersController,
  getCleanProcessOrderByIdController,
  createCleanProcessOrderController,
  createFullCleanProcessOrderController,
  updateCleanProcessOrderController,
  destroyCleanProcessOrderController,
  startCleanProcessOrderController,
  stepDoneCleanProcessOrderController,
  doneCleanProcessOrderController,
};
