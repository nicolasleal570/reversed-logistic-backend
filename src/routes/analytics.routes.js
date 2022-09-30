const express = require('express');
const passport = require('passport');
const {
  mostUsedCasesController,
  bestCustomersController,
  worstCustomersController,
  bestFlavorsController,
  bestTrucksController,
} = require('../controllers/analytics.controller');

const router = express.Router();

router.get(
  '/cases-most-used',
  passport.authenticate('jwt', { session: false }),
  mostUsedCasesController
);

router.get(
  '/best-customers',
  passport.authenticate('jwt', { session: false }),
  bestCustomersController
);

router.get(
  '/worst-customers',
  passport.authenticate('jwt', { session: false }),
  worstCustomersController
);

router.get(
  '/best-flavors',
  passport.authenticate('jwt', { session: false }),
  bestFlavorsController
);

router.get(
  '/best-trucks',
  passport.authenticate('jwt', { session: false }),
  bestTrucksController
);

module.exports = router;
