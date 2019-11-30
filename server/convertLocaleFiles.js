// converter script to change the PHP locale files from v3 to JS files for v4. This can be removed soon.
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

const generateLangFileContents = (data) => {
	const json = JSON.stringify(data, null, '\t');
	return `export default lang = ` + json + ';\n';
};


const findLocaleFiles = () => {
	const baseFolder = '../src/plugins/exportTypes';

	const folders = fs.readdirSync(baseFolder);
	folders.forEach((folder) => {
		const langFolder = `${baseFolder}/${folder}/i18n`;
		if (fs.existsSync(langFolder)) {
			const files = fs.readdirSync(langFolder);

			files.forEach((file) => {
				const [filename, extension] = file.split('.');
				const content = fs.readFileSync(`${langFolder}/${file}`, 'utf8');
				const json = convert(content);
				fs.writeFileSync(`${langFolder}/${filename}.js`, generateLangFileContents(json));
			});
		}
	});
};

findLocaleFiles();
