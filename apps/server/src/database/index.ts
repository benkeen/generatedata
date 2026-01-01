import { Sequelize } from 'sequelize';
import accounts from './tables/accounts';
import dataSets from './tables/dataSets';
import dataSetHistory from './tables/dataSetHistory';
import settings from './tables/settings';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const sequelize = new Sequelize(process.env.GD_DB_NAME, process.env.GD_MYSQL_ROOT_USER, process.env.GD_MYSQL_ROOT_PASSWORD, {
  host: 'db',
  port: process.env.GD_DB_PORT,
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
});

const db = {};
[accounts, dataSets, dataSetHistory, settings].forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

// define our associations
db.dataSets.hasMany(db.dataSetHistory, { foreignKey: 'dataSetId' });
db.dataSetHistory.belongsTo(db.dataSets);

// TODO urgh...
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
