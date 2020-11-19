const express = require('express');
const app = express();
const helpers = require('./database.helpers');

require('dotenv').config();


app.get('/settings', (req, res) => {
	res.json({
		installed: false
	});
});

app.get('/api/here', (req, res) => {
	const connection = helpers.getConnection();

	connection.query('SELECT * FROM user_accounts', (error, results) => {
		if (error) {
			throw error;
		}
		const data = results.map((i) => i.first_name);

		res.json({
			data
		});
	});

	connection.end();
});

app.listen(process.env.GD_API_SERVER_PORT);
console.log('Server started on port ' + process.env.GD_API_SERVER_PORT);
