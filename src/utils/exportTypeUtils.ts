import { exportTypes } from '../_plugins';
import { DropdownOption } from '../components/dropdown/Dropdown';

export const exportTypeOptions: DropdownOption[] = exportTypes.map(({ name, folder }) => ({
	value: folder,
	label: name
}));


export const loadExportTypeBundle = (exportType: string) => {
	return import(/* webpackChunkName: "exportType-[request]" */ `../plugins/exportTypes/${exportType}/bundle`)
		.then(({ default: et }) => {
			console.log(et);
			// flag this as loaded in the store.
		});
};