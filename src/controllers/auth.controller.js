const UserService = require('../services/users.service');
const AuthService = require('../services/auth.service');

const usersService = new UserService();
const authService = new AuthService();

async function registerAuthController(req, res, next) {
  try {
    const { body } = req;
    await usersService.create(body);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
}

async function loginAuthController(req, res, next) {
  try {
    const { user: authUser } = req;
    res.status(200).json(authService.signToken(authUser));
  } catch (error) {
    next(error);
  }
}

async function recoveryAuthController(req, res, next) {
  try {
    const { email } = req.body;
    const message = await authService.sendRecovery(email);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
}

async function changePasswordAuthController(req, res, next) {
  try {
    const { token: recoveryToken, newPassword } = req.body;

    const message = await authService.changePassword(
      recoveryToken,
      newPassword
    );
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerAuthController,
  loginAuthController,
  recoveryAuthController,
  changePasswordAuthController,
};
