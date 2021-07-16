/* eslint-disable import/extensions */
import { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../../pkg/auth/service';

const login = (authsvc: AuthService) => (req: Request, res: Response) => {
  const { username } = req.body;
  const { password } = req.body;
  const uuid = authsvc.authenticate(username, password);

  const jwtPayload = { id: uuid };
  const token = jwt.sign(jwtPayload, process.env.JWTSECRET as string);
  if (token === null) {
    res.sendStatus(401);
  } else {
    res.json({
      token,
    });
  }
};

const registerHandlers = (app: Express, authsvc: AuthService) => {
  app.post('/login', login(authsvc));
};

export { registerHandlers as default };
