const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/environment');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.tokenSecret,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
