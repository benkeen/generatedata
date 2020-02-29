import { exportTypes, ExportTypeFolder } from '../_plugins';
// import { DropdownOption } from '../components/dropdown/Dropdown';

export const exportTypeOptions = Object.keys(exportTypes)
	.map((exportType: ExportTypeFolder) => {
		return {
			value: exportType,
			// @ts-ignore
			label: exportTypes[exportType].name
		};
	});

export const loadExportTypeBundle = (exportType: string) => {
	return import(/* webpackChunkName: "exportType-[request]" */ `../plugins/exportTypes/${exportType}/bundle`)
		.then(({ default: et }) => {
			console.log(et);
			// flag this as loaded in the store.
		});
};