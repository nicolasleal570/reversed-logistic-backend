const express = require('express');
const passport = require('passport');
const {
  mostUsedCasesController,
} = require('../controllers/analytics.controller');

const router = express.Router();

router.get(
  '/cases-most-used',
  passport.authenticate('jwt', { session: false }),
  mostUsedCasesController
);

module.exports = router;
