/**
 * *** None of the settings in this file ever get doled up to the client-side code. They're private to the server. ***
 *
 * For now I'll stick this in a server/ folder to make that really clear. But maybe in terms of user-defined files
 * it'd be better to group them in a single location (root?)
 */

const serverConfig = {
	dbHostname: '',
	dbName: '',
	dbUsername: '',
	dbPassword: '',
	dbTablePrefix: 'gd_',
};

export default serverConfig;
