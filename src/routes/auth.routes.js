const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');
const {
  loginUserSchema,
  recoveryUserSchema,
  changePasswordUserSchema,
} = require('../schemas/auth.schema');
const {
  registerAuthController,
  loginAuthController,
  recoveryAuthController,
  changePasswordAuthController,
} = require('../controllers/auth.controller');

const router = express.Router();

// Register new user
router.post(
  '/register',
  validatorHandler(createUserSchema, 'body'),
  registerAuthController
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

module.exports = router;
