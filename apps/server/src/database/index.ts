import { Sequelize } from 'sequelize';
import accounts from './tables/accounts';
import dataSets from './tables/dataSets';
import dataSetHistory from './tables/dataSetHistory';
import settings from './tables/settings';
import { serverConfig } from '@generatedata/config';

// require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const sequelize = new Sequelize(
  serverConfig.database.GD_DB_NAME,
  serverConfig.database.GD_MYSQL_ROOT_USER,
  serverConfig.database.GD_MYSQL_ROOT_PASSWORD,
  {
    host: 'db',
    port: serverConfig.database.GD_DB_PORT,
    dialect: 'mysql',
    define: {
      freezeTableName: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};
[accounts, dataSets, dataSetHistory, settings].forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

// define our associations
db.dataSets.hasMany(db.dataSetHistory, { foreignKey: 'dataSetId' });
db.dataSetHistory.belongsTo(db.dataSets);

// TODO why?!
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
