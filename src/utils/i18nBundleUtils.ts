import { dataTypes, DataTypeFolder } from '../_plugins';
import { GDLocale } from '../../types/general';

export type DTLocaleMap = {
	[str in DataTypeFolder]?: any;
}

export const getDataTypeLocales = (locale: GDLocale): any => {
	const dtLocales: DTLocaleMap = {};
	
	// Object.keys(dataTypes)
	// 	.forEach((folder: DataTypeFolder) => {
	// 		if (dataTypes[folder].localeFiles.indexOf(locale) === -1) {
	// 			return;
	// 		}

	// 		// here we use the more flexible requireJS import to grab the file content and stick it into our data 
	// 		// structure. That allows only the appropriate locale file bundle to include the necessary strings
			
	// 		// @ts-ignore
	// 		const i18n = require(`../plugins/dataTypes/${folder}/i18n/${locale}`);
			
	// 		dtLocales[folder] = i18n.default;
	// 	});

	console.log(locale);

	// @ts-ignore
	const i18n = require(`../plugins/dataTypes/AutoIncrement/i18n/${locale}.ts`);

	// const i18n = {
	// 	default: 'FUCKING WEBPACK'
	// };

	// @ts-ignore
	dtLocales.AutoIncrement = i18n.default;

	return dtLocales;
};