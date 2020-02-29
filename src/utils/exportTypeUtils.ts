import { exportTypes, ExportTypeFolder } from '../_plugins';
// import { DropdownOption } from '../components/dropdown/Dropdown';

export const exportTypeOptions = Object.keys(exportTypes)
	.map((exportType: ExportTypeFolder) => {
		return {
			value: exportType,
			label: exportTypes[exportType].name
		};
	});

export const loadExportTypeBundle = (exportType: string): any => (
	import(/* webpackChunkName: "exportType-[request]" */ `../plugins/exportTypes/${exportType}/bundle`)
);
