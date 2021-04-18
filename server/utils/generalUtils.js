const getSiteUrl = () => {
	let protocol = 'http';
	const domain = process.env.GD_WEB_DOMAIN;

	if (process.env.GD_WEB_USE_HTTPS === 'true') {
		protocol = 'https';
	}

	let port = process.env.GD_WEB_SERVER_PORT.trim();
	if (port) {
		port = `:${port}`;
	}

	return `${protocol}${domain}${port}`;
};


module.exports = {
	getSiteUrl
};
