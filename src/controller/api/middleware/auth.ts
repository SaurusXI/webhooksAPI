/* eslint-disable import/extensions */
import passport from 'passport';
import passportJWT from 'passport-jwt';

import AuthService from '../../pkg/auth/service';

const { Strategy } = passportJWT;
const { ExtractJwt } = passportJWT;

const params = {
  secretOrKey: process.env.JWTSECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const sessionParams = {
  session: false,
};

const authMiddleware = (authsvc: AuthService) => {
  const strategy = new Strategy(params, async (payload, done) => {
    const validUser = authsvc.validate(payload.id);
    if (validUser) {
      return done(null, {
        id: payload.id,
      });
    }
    return done(new Error('User not found'), null);
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', sessionParams),
  };
};

export { authMiddleware as default };
