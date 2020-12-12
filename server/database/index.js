const Sequelize = require('sequelize');
const accounts = require('./tables/accounts');
const dataSets = require('./tables/dataSets');
const dataSetHistory = require('./tables/dataSetHistory');
const settings = require('./tables/settings');

require('dotenv').config();

const sequelize = new Sequelize(
	process.env.GD_DB_NAME,
	process.env.GD_MYSQL_ROOT_USER,
	process.env.GD_MYSQL_ROOT_PASSWORD,
	{
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

// Object.keys(db).forEach(key => {
// 	if ('associate' in db[key]) {
// 		db[key].associate(db);
// 	}
// });

// urgh...
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
