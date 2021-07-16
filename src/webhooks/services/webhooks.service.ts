/* eslint-disable import/extensions */
import modelsvc from '../pkg/model/service';

const webhooksMicroservice = {
  name: 'webhooks',
  methods: {
    async register(targetUrl: string) {
      return modelsvc.registerURL(targetUrl);
    },

    async update(id: string, newTargetUrl: string) {
      return modelsvc.updateURLForID(id, newTargetUrl);
    },

    async list() {
      return modelsvc.listAllURLsByID();
    },
  },
};

export { webhooksMicroservice as default };
