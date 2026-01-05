import { Sequelize } from 'sequelize';
import accounts from './tables/accounts';
import dataSets from './tables/dataSets';
import dataSetHistory from './tables/dataSetHistory';
import settings from './tables/settings';
import { serverConfig } from '@generatedata/config';

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

type DBType = {
  accounts: ReturnType<typeof accounts>;
  dataSets: ReturnType<typeof dataSets>;
  dataSetHistory: ReturnType<typeof dataSetHistory>;
  settings: ReturnType<typeof settings>;
};

const db: DBType = {} as DBType;
db.accounts = accounts(sequelize);
db.dataSets = dataSets(sequelize);
db.dataSetHistory = dataSetHistory(sequelize);
db.settings = settings(sequelize);

db.dataSets.hasMany(db.dataSetHistory, { foreignKey: 'dataSetId' });
db.dataSetHistory.belongsTo(db.dataSets);

// db.Sequelize = Sequelize;

export { db, sequelize };
