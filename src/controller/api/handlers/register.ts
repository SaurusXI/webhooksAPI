/* eslint-disable import/extensions */
import { Express } from 'express';
import { authJWT } from '../middleware/auth';
import AuthService from '../../pkg/auth/service';

import registerAuthHandlers from './auth';
import registerWebhooksHandlers from './webhooks';

const registerHandlers = (app: Express, authsvc: AuthService, JWT: authJWT) => {
  registerAuthHandlers(app, authsvc);
  registerWebhooksHandlers(app, JWT);
};

export { registerHandlers as default };
