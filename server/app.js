const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();

// serve static assets normally
// app.use(express.static(__dirname + '../client/dist'));

app.get('/api/here', (req, res) => {
	res.json({ whoah: 'Holy crap API can be called.' });
});

// redirect everything else to index.html in the /client folder
// app.get('*', function (request, response) {
// 	response.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
// });

app.listen(port);
console.log('server started on port ' + port);
