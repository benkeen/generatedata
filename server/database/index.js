const Sequelize = require('sequelize');
const userAccountTable = require('./models/accounts');

require('dotenv').config();

const db = {};

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
			idle: 10000,
		},
		// <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
		operatorsAliases: false
	}
);

const models = [
	userAccountTable
];

models.forEach(model => {
	const seqModel = model(sequelize, Sequelize);
	db[seqModel.name] = seqModel;
});

Object.keys(db).forEach(key => {
	if ('associate' in db[key]) {
		db[key].associate(db);
	}
});

db.sequelize = sequelize; // urgh.
db.Sequelize = Sequelize;

module.exports = db;
