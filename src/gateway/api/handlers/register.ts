/* eslint-disable import/extensions */
import { Express } from 'express';
import { authJWT } from '../middleware/auth';
import AuthService from '../../pkg/auth/service';
import RPCService from '../../pkg/rpc/service';

import registerAuthHandlers from './auth';
import registerWebhooksHandlers from './webhooks';

const registerHandlers = async (
  app: Express, authsvc: AuthService, rpcsvc: RPCService, JWT: authJWT,
) => {
  registerAuthHandlers(app, authsvc);
  await registerWebhooksHandlers(app, JWT, rpcsvc);
};

export { registerHandlers as default };
