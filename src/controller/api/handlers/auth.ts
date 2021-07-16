/* eslint-disable import/extensions */
import { Express, Request, Response } from 'express';
import AuthService from '../../pkg/auth/service';

const login = (authsvc: AuthService) => (req: Request, res: Response) => {
  const { username } = req.body;
  const { password } = req.body;
  const token = authsvc.authenticate(username, password);

  if (token === null) {
    console.log('Login failure');
    res.sendStatus(401);
  } else {
    console.log('Login success');
    res.json({
      token,
    });
  }
};

const registerHandlers = (app: Express, authsvc: AuthService) => {
  app.post('/login', login(authsvc));
};

export { registerHandlers as default };
