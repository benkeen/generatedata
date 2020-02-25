// Step 1 of the build process. Generates a temporary TS file importing all plugins.
const fs = require('fs');
const path = require('path');
import * as helpers from './helpers';

const baseFolder = path.join(__dirname, '..', '/src/plugins/dataTypes');

const getDataTypesWithBundles = () => {
	const folders = fs.readdirSync(baseFolder);

	return folders.filter((folder: string) => {
		if (/^[_.]/.test(folder)) {
			return;
		}
		const bundle = `${baseFolder}/${folder}/bundle.ts`;
		if (!fs.existsSync(bundle)) {
			console.log(`-- Data Type: '${folder}' is missing bundle.ts file.`);
			return false;
		}
		return true;
	});
};

const generateTmpImportPluginsFile = (): void => {
	const dataTypes = getDataTypesWithBundles();
	const imports = dataTypes.map((folder: string) => `import ${folder} from '${baseFolder}/${folder}/bundle';`).join('\n');
	const exports = `\n\nexport const dataTypes = {\n\t${dataTypes.join(',\n\t')}\n};\n`;
	const content = `${imports}${exports}`;
	helpers.createBuildFile('_tmpPluginList.ts', content);
};

generateTmpImportPluginsFile();
