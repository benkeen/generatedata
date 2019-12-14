const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
// const url = require('url');
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// app.get('/api/here', (req, res) => {
// 	const urlParts = url.parse(req.url, true);
// 	const queryParams = urlParts.query;
// });

// redirect everything else to index.html
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port);
console.log('server started on port ' + port);
