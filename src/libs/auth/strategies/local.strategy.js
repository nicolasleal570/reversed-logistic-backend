const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');
const CustomerLocationsService = require('../../../services/customer-location.service');

const service = new AuthService();
const customerLocationsService = new CustomerLocationsService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const location = await customerLocationsService.getAuthLocation(
        email,
        password
      );

      if (location) {
        done(null, { isLocation: true, ...location });
        return;
      }

      const user = await service.getUser(email, password);
      done(null, { isLocation: false, ...user });
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
