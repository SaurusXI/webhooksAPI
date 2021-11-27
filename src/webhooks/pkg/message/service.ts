/* eslint-disable import/extensions */
import axios from 'axios';
import modelsvc from '../model/service';

interface params {
  url: string,
  retries: number,
}

const getLinuxTimestamp = () => Math.round((new Date()).getTime() / 1000);

const MessageService = {
  async sendMessagesRunner(msg: any, requestParams: params[]) {
    const requests = requestParams.map((requestParam) => () => axios.post(
      requestParam.url,
      {
        msg,
        timestamp: getLinuxTimestamp(),
      },
    ));

    const responses = await Promise.all(
      requests.map((requester) => requester()).map(
        // Promise rejection indicates an unsuccessful request, which is handled later
        // So we just bypass any promise rejections
        (p) => p.catch((e) => e),
      ),
    );

    const out = [];
    for (let i = 0; i < responses.length; i += 1) {
      if (responses[i].status !== 200) {
        // eslint-disable-next-line no-param-reassign
        requestParams[i].retries += 1;
        if (requestParams[i].retries < 5) {
          out.push(requestParams[i]);
        }
      }
    }

    return out;
  },

  async sendMessages(msg: any, batchSize: number) {
    const urls = await modelsvc.listAllURLs();
    let requestParams: params[] = urls.map((url) => ({
      url,
      retries: 0,
    }));

    let firstIdx = 0;
    let lastIdx = Math.min(batchSize, urls.length);

    // Break URLs into batches and execute concurrently in runner
    while (firstIdx < lastIdx) {
      requestParams = requestParams.concat(
        // limit number of concurrent requests by awaiting this -
        // eslint-disable-next-line no-await-in-loop
        await this.sendMessagesRunner(msg, requestParams.slice(firstIdx, lastIdx)),
      );
      firstIdx = lastIdx;
      lastIdx = Math.min(lastIdx + batchSize, requestParams.length);
    }
  },
};

export { MessageService as default };
