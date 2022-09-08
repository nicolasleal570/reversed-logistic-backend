const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  loginUserSchema,
  recoveryUserSchema,
  changePasswordUserSchema,
} = require('../schemas/auth.schema');
const {
  loginAuthController,
  recoveryAuthController,
  changePasswordAuthController,
  currentUserAuthController,
  logoutAuthController,
} = require('../controllers/auth.controller');

const router = express.Router();

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  currentUserAuthController
);

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  validatorHandler(loginUserSchema, 'body'),
  loginAuthController
);

router.post(
  '/recovery',
  validatorHandler(recoveryUserSchema, 'body'),
  recoveryAuthController
);

router.post(
  '/change-password',
  validatorHandler(changePasswordUserSchema, 'body'),
  changePasswordAuthController
);

router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  logoutAuthController
);

module.exports = router;
