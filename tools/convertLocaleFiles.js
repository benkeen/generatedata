// converter script to change the PHP locale files from v3 to JS files for v4
var fs = require('fs');

const convert = (str) => {
	const lines = str.split('\n');
	const map = {};
	lines.map((line) => {
		const parts = line.match(/\$L\["(.*)"\] = "(.*)";\s?/);
		if (parts && parts.length === 3) {
			map[parts[1]] = parts[2];
		}

		const nameParts = line.match(/\s+\"(.*)" => "(.*)",?\s?/);
		if (nameParts && nameParts.length === 3) {
			map[nameParts[1]] = nameParts[2];
		}
	});

	return map;
};


const findLocaleFiles = () => {
	const baseFolder = '../src/plugins/dataTypes/';

	const folders = fs.readdirSync(baseFolder);
	folders.forEach((folder) => {
		const langFolder = `${baseFolder}/${folder}/lang`;
		if (fs.existsSync(langFolder)) {
			const files = fs.readdirSync(langFolder);

			files.forEach((file) => {
				const content = fs.readFileSync(`${langFolder}/${file}`, 'utf8');

				
			});
		}
	});
};

findLocaleFiles();
