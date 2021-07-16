import { Express, Request, Response } from 'express';
import AuthService from '../../pkg/auth/service';

const login = (authsvc: AuthService) => {
  return (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = authsvc.authenticate(username, password);

    if (token === null) {
      console.log('Login failure');
      res.sendStatus(401);
    } else {
      console.log('Login success')
      res.json({
        token: token
      });
    }
  };
};

const registerHandlers = (app: Express, authsvc: AuthService) => {
  app.post('/login', login(authsvc));
};

export { registerHandlers as default };
