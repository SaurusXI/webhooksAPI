/* eslint-disable import/extensions */
import { Express, Request, Response } from 'express';
import RPCService from '../../pkg/rpc/service';
import { authJWT } from '../middleware/auth';

const fetch = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  try {
    const result = await rpcsvc.fetch();
    res.json({
      urls: result,
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const register = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  try {
    const url = req.body.targetUrl;
    if (typeof url !== 'string') {
      res.status(400).json({
        msg: 'Malformed request',
      });
    }

    const result = await rpcsvc.register(url as string);

    res.json({
      id: result,
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const update = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  try {
    const newUrl = req.body.newTargetUrl;
    const urlId = req.body.id;

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
  } catch (err) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const trigger = (rpcsvc: RPCService) => async (req: Request, res: Response) => {
  try {
    const { body } = req;
    rpcsvc.trigger(body);
    res.json({
      msg: 'Webhooks triggered',
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const registerHandlers = async (app: Express, JWT: authJWT, rpcsvc: RPCService) => {
  app.get('/list', JWT.authenticate(), fetch(rpcsvc));
  app.patch('/webhook', JWT.authenticate(), update(rpcsvc));
  app.post('/webhook', JWT.authenticate(), register(rpcsvc));
  app.get('/trigger', JWT.authenticate(), trigger(rpcsvc));
};

export { registerHandlers as default };
