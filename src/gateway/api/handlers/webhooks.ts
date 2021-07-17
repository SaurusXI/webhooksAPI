/* eslint-disable import/extensions */
import { Express, Request, Response } from 'express';
import RPCService from '../../pkg/rpc/service';
import { authJWT } from '../middleware/auth';

const fetch = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  const result = await rpcsvc.fetch();
  res.json({
    urls: result,
  });
};

const register = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  const url = req.query.targetUrl;
  if (typeof url !== 'string') {
    res.status(400).json({
      msg: 'Malformed request',
    });
  }

  const result = await rpcsvc.register(url as string);

  res.json({
    id: result,
  });
};

const update = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  const newUrl = req.query.newTargetUrl;
  const urlId = req.query.id;

  if (typeof newUrl !== 'string' || typeof urlId !== 'string') {
    res.status(400).json({
      msg: 'Malformed request',
    });
  }

  const updated = await rpcsvc.update(newUrl as string, urlId as string);

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
  const { ipAddress } = req.body;
  if (typeof ipAddress !== 'string') {
    res.status(400).json({
      msg: 'malformed request',
    });
  }
  rpcsvc.trigger(req.body.ipAddress);
  res.json({
    msg: 'Webhooks triggered',
  });
};

const registerHandlers = async (app: Express, JWT: authJWT, rpcsvc: RPCService) => {
  app.get('/list', JWT.authenticate(), fetch(rpcsvc));
  app.get('/update', JWT.authenticate(), update(rpcsvc));
  app.get('/register', JWT.authenticate(), register(rpcsvc));
  app.get('/ip', JWT.authenticate(), trigger(rpcsvc));
};

export { registerHandlers as default };
