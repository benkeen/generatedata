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
			const fileWithoutExtension = file.replace(/\.ts$/, '');
			rows.push(`import * as ${key} from '${fileWithoutExtension}';`);
			exportList.push(key);
		}
	});

	let content = rows.join('\n') + `\n\nexport const dataTypesGenerate: any = {\n\t${exportList.join(',\n\t')}\n};`;
	content += `\n\nexport const dataTypeNames: string[] = [\n\t'${exportList.join('\',\n\t\'')}'\n];`;

	helpers.createBuildFile('dataTypesListGenerate.ts', content);
};

processDataTypes();
