import passport from 'passport';
import passportJWT from 'passport-jwt';

const { Strategy } = passportJWT;
const { ExtractJwt } = passportJWT;

const params = {
  secretOrKey: process.env.JWTSECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const sessionParams = {
  session: false,
};

const authMiddleware = () => {
  const strategy = new Strategy(params, async (payload, done) => {
    const validUser = true;
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
