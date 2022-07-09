const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getTruckSchema,
  updateTruckSchema,
  createTruckSchema,
} = require('../schemas/trucks.schema');
const {
  getTrucksController,
  getTruckByIdController,
  updateTruckController,
  destroyTruckController,
  createTruckController,
} = require('../controllers/trucks.controller');

const router = express.Router();

router.get('/', getTrucksController);

router.get(
  '/:id',
  validatorHandler(getTruckSchema, 'params'),
  getTruckByIdController
);

router.post(
  '/',
  validatorHandler(createTruckSchema, 'body'),
  createTruckController
);

router.patch(
  '/:id',
  validatorHandler(getTruckSchema, 'params'),
  validatorHandler(updateTruckSchema, 'body'),
  updateTruckController
);

router.delete(
  '/:id',
  validatorHandler(getTruckSchema, 'params'),
  destroyTruckController
);

module.exports = router;
