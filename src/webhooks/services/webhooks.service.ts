/* eslint-disable import/extensions */
import { Context } from 'moleculer';
import modelsvc from '../pkg/model/service';
import messagesvc from '../pkg/message/service';

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

    async delete(ctx: Context<{id: string}, {}>) {
      return modelsvc.deleteURLByID(ctx.params.id);
    },

    async trigger(ctx: Context<{body: any}, {}>) {
      await messagesvc.sendMessages(ctx.params.body, 5);
    },
  },
};

export { webhooksMicroservice as default };
