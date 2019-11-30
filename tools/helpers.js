const fs = require('fs');
const path = require('path');

const createBuildFile = (filename, content) => {
	const buildFolder = path.join(__dirname, '..', 'build');
	if (!fs.existsSync(buildFolder)) {
		fs.mkdirSync(buildFolder, { recursive: true });
	}

	const file = path.join(__dirname, '..', 'build', filename);
	if (fs.exists(file)) {
		fs.unlinkSync(file);
	}
	fs.writeFileSync(file, content);
};


module.exports = {
	createBuildFile
};
