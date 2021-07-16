/* eslint-disable import/extensions */
import { Express } from 'express';
import AuthService from '../../pkg/auth/service';

import registerAuthHandlers from './auth';

const registerHandlers = (app: Express, authsvc: AuthService) => {
  registerAuthHandlers(app, authsvc);
};

export { registerHandlers as default };
