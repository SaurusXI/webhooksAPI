/* eslint-disable import/extensions */
import { Context } from 'moleculer';
import modelsvc from '../pkg/model/service';

const webhooksMicroservice = {
  name: 'webhooks',
  actions: {
    async register(ctx: Context<{targetUrl: string}, {}>) {
      return modelsvc.registerURL(ctx.params.targetUrl);
    },

    async update(ctx: Context<{id: string, newTargetUrl: string}, {}>) {
      return modelsvc.updateURLForID(ctx.params.id, ctx.params.newTargetUrl);
    },

    async list() {
      return modelsvc.listAllURLsByID();
    },
  },
};

export { webhooksMicroservice as default };
