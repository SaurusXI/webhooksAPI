/* eslint-disable import/extensions */
import e from 'express';
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
    return done(null, false);
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', sessionParams),
  };
};

interface authJWT {
  initialize(): e.Handler,
  authenticate(): any,
}

export { authJWT, authMiddleware as default };
