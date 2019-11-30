const fs = require('fs');

const createBuildFile = (filename) => {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}

	const file = path.join(__dirname, '..', 'build', 'dataTypes.js');
	if (fs.exists(file)) {
		fs.unlinkSync(file);
	}
	fs.writeFileSync(file, `export default ${JSON.stringify(data, null, '\t')}`);
};
