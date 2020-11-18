const express = require('express');
const mysql = require('mysql');
const port = process.env.PORT || 3001;
const app = express();


app.get('/api/here', (req, res) => {
	const connection = mysql.createConnection({
		host: 'db',
		port: 3306,
		user: 'root',
		password: 'rootpass357',
		database: 'generatedata'
	});

	connection.connect();

	connection.query('SELECT * FROM users', (error, results) => {
		if (error) {
			throw error;
		}

		const data = results.map((i) => i.name);

		res.json({
			data
		});
	});

	connection.end();
});

app.listen(port);
console.log('Server started on port ' + port);
