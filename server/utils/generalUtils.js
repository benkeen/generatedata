// GD_WEB_DOMAIN=localhost
// GD_WEB_SERVER_PORT=9000
// GD_WEB_USE_HTTPS=false


const getWebsiteUrl = () => {
	let protocol = 'http';

	console.log(process.env);

	if (process.env.GD_WEB_USE_HTTPS === 'true') {
		protocol = 'https';
	}

};
