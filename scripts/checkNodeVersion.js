var fs = require('fs');
var path = require('path');

fs.readFile(path.join(__dirname, '../.nvmrc'), 'utf8', function (error, data) {
	if (error) {
		throw error;
	}

	const expectedVersion = data.trim().replace('v', '');
	const currentVersion = process.version.replace('v', '');

	const versionMatchesExactly = expectedVersion === currentVersion;
	if (versionMatchesExactly) {
		process.exit();
	}

	const nvmInstallText = 'To do this, install nvm (https://github.com/nvm-sh/nvm) and run `nvm install`';

	console.log(
		"\x1b[31m%s\x1b[0m",
		`___________________________________________________________________

Sorry, you're running an unsupported node version: ${currentVersion}.

Please install ${expectedVersion}. ${nvmInstallText}
___________________________________________________________________\n`
	);

	process.exit(1);
});
