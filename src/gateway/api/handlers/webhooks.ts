/* eslint-disable import/extensions */
import { ServiceBroker } from 'moleculer';
import { Express, Request, Response } from 'express';
import molecularConfig from '../../../moleculer.config';
import RPCService from '../../pkg/rpc/service';
import { authJWT } from '../middleware/auth';

const broker = new ServiceBroker(molecularConfig);

const fetch = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  const result = await rpcsvc.fetch();
  res.json({
    urls: result,
  });
};

const register = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  const url = req.body.targeturl;

  const result = await rpcsvc.register(url);

  res.json({
    id: result,
  });
};

const update = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  const newUrl = req.body.targeturl;
  const urlId = req.body.id;

  const updated = await rpcsvc.update(newUrl, urlId);

  if (!updated) {
    res.status(400).json({
      msg: 'Webhook ID not found',
    });
  } else {
    res.status(200).json({
      msg: 'Webhook updated',
    });
  }
};

const trigger = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  rpcsvc.trigger(req.body.ipAddress);
  res.json({
    msg: 'Webhooks triggered',
  });
};

const registerHandlers = async (app: Express, JWT: authJWT, rpcsvc: RPCService) => {
  await broker.start();
  app.get('/list', JWT.authenticate(), fetch(rpcsvc));
  app.post('/update', JWT.authenticate(), update(rpcsvc));
  app.post('/register', JWT.authenticate(), register(rpcsvc));
  app.post('/trigger', JWT.authenticate(), trigger(rpcsvc));
};

export { registerHandlers as default };
