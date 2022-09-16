const AuthService = require('../services/auth.service');
const CustomerLocationsService = require('../services/customer-location.service');

const authService = new AuthService();
const customerLocationService = new CustomerLocationsService();

async function currentUserAuthController(req, res, next) {
  try {
    const {
      sub: { id, isLocation },
    } = req.user;

    if (isLocation) {
      const location = await customerLocationService.findOne(id, true);
      res.status(201).json({ location });
      return;
    }

    const user = await authService.getCurrentUser(id);
    res.status(201).json({ user });
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

async function logoutAuthController(_req, res, next) {
  try {
    res.clearCookie('authorization');

    res.json({
      message: 'Sesión finalizada',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginAuthController,
  recoveryAuthController,
  changePasswordAuthController,
  currentUserAuthController,
  logoutAuthController,
};
