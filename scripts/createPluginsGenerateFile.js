require = require('esm')(module); // allows us to read es6 files
const helpers = require('./helpers');
const fs = require('fs');

// TODO check that no FE bundle includes the full paths
const processDataTypes = () => {
	let rows = [];
	let exportList = [];
	helpers.getDataTypes().map((i) => {
		const key = i.folder;
		const file = `${i.folderPath}/${i.folder}.generate.ts`;
		if (fs.existsSync(file)) {
			rows.push(`import * as ${key} from '${file}';`);
			exportList.push(key);
		}
	});

	let content = rows.join('\n') + `\n\nexport const dataTypesGnerate = {\n\t${exportList.join(',\n\t')}\n};`;
	content += `\n\nexport const dataTypeNames = [\n\t'${exportList.join('\',\n\t\'')}'\n];`;

	helpers.createBuildFile('dataTypesListGenerate.js', content);
};

processDataTypes();
