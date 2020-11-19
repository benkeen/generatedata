const mysql = require('mysql');

require('dotenv').config();

module.exports.getConnection = () => {
	const connection = mysql.createConnection({
		host: 'db',
		port: process.env.GD_DB_PORT,
		user: process.env.GD_MYSQL_ROOT_USER,
		password: process.env.GD_MYSQL_ROOT_PASSWORD,
		database: process.env.GD_DB_NAME
	});

	connection.connect();

	return connection;
};
