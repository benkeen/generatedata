require = require('esm')(module); // allows us to read es6 files
const helpers = require('./helpers');
const fs = require('fs');

// TODO check that no FE bundle includes the full paths
const processDataTypes = () => {
	let rows = [];
	let exportList = [];
	helpers.getDataTypes().map((i) => {
		const key = i.folder;
		const uiFile = `${i.folderPath}/${i.folder}.ui.js`;
		if (fs.existsSync(uiFile)) {
			rows.push(`import * as ${key} from '${uiFile}';`);
			exportList.push(key);
		}
	});

	let content = rows.join('\n') + `\n\nexport const dataTypes = {\n\t${exportList.join(',\n\t')}\n};`;
	content += `\n\nexport const dataTypeNames = [\n\t'${exportList.join('\',\n\t\'')}'\n];`;

	helpers.createBuildFile('dataTypesListUI.js', content);
};

processDataTypes();
