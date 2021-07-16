/* eslint-disable import/extensions */
import { ServiceBroker } from 'moleculer';
import { Express, Request, Response } from 'express';
import molecularConfig from '../../../moleculer.config';
import { authJWT } from '../middleware/auth';

const broker = new ServiceBroker(molecularConfig);

const fetch = () => async (req: Request, res: Response) => {
  const result = await broker.call('webhooks.list');
  res.json({
    urls: result,
  });
};

const register = () => async (req: Request, res: Response) => {
  const url = req.body.targeturl;
  const params = {
    targetUrl: url,
  };

  const result = await broker.call('webhooks.register', params);

  res.json({
    id: result,
  });
};

const update = () => async (req: Request, res: Response) => {
  const newUrl = req.body.targeturl;
  const urlId = req.body.id;
  const params = {
    newTargetUrl: newUrl,
    id: urlId,
  };

  const updated = await broker.call('webhooks.update', params);

  if (!updated) {
    res.status(400).send('Webhook ID not found');
  } else {
    res.status(200).send('Webhook updated');
  }
};

const registerHandlers = async (app: Express, JWT: authJWT) => {
  await broker.start();
  app.get('/list', JWT.authenticate(), fetch());
  app.post('/update', JWT.authenticate(), update());
  app.post('/register', JWT.authenticate(), register());
};

export { registerHandlers as default };
