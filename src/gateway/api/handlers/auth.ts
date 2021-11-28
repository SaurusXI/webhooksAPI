/* eslint-disable import/extensions */
import { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../../pkg/auth/service';

const register = (authsvc: AuthService) => (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        msg: 'Malformed request',
      });
      return;
    }

    const uuid = authsvc.register(username, password);

    const jwtPayload = { id: uuid };
    const token = jwt.sign(jwtPayload, process.env.JWTSECRET as string);
    if (token === null) {
      res.sendStatus(401);
    } else {
      res.json({
        token,
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const login = (authsvc: AuthService) => (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const registerHandlers = (app: Express, authsvc: AuthService) => {
  app.post('/auth/register', register(authsvc));
  app.post('/auth/login', login(authsvc));
};

export { registerHandlers as default };
