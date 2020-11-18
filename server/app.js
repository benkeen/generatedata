const express = require('express');
const port = process.env.PORT || 3001;
const app = express();

app.get('/api/here', (req, res) => {
	res.json({ whoah: 'Holy crap API can be called!' });
});

app.listen(port);
console.log('server started on port ' + port);
