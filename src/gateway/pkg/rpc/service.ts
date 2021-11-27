import { ServiceBroker } from 'moleculer';
// eslint-disable-next-line import/extensions
import moleculerConfig from '../../../moleculer.config';

class RPCService {
  broker: ServiceBroker

  constructor() {
    this.broker = new ServiceBroker(moleculerConfig);
    this.broker.start();
  }

  async fetch() {
    return this.broker.call('webhooks.list');
  }

  async register(targetUrl: string) {
    const params = {
      targetUrl,
    };
    return this.broker.call('webhooks.register', params);
  }

  async update(newTargetUrl: string, id: string) {
    const params = {
      newTargetUrl,
      id,
    };
    return this.broker.call('webhooks.update', params);
  }

  async trigger(body: any) {
    const params = {
      body,
    };
    return this.broker.call('webhooks.trigger', params);
  }
}

export { RPCService as default };
