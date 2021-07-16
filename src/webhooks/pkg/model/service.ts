/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid';
import { URL, sequelize as db } from './entity';

const ModelService = {
  async registerURL(url: string) {
    const id = uuidv4();
    await db.sync();
    await URL.create({
      id,
      url,
    });
    return id;
  },

  async updateURLForID(id: string, newUrl: string) {
    await db.sync();
    const result = await URL.update({ url: newUrl }, {
      where: {
        id,
      },
    });

    if (result[0] === 0) {
      return false;
    }
    return true;
  },

  async listAllURLsByID() {
    await db.sync();
    const queryResult = await URL.findAll();
    const result = queryResult.map((row) => ({
      id: row.getDataValue('id'),
      url: row.getDataValue('url'),
    }));
    return result;
  },

  async listAllURLs() {
    await db.sync();
    const queryResult = await URL.findAll({
      attributes: ['url'],
    });
    const result = queryResult.map((row) => row.getDataValue('url'));
    return result;
  },
};

export { ModelService as default };
