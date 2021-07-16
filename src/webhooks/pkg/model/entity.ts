import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'webhooks.db',
});

class URL extends Model {}
URL.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  url: DataTypes.STRING,
}, { sequelize, modelName: 'URL' });

export { URL, sequelize };
