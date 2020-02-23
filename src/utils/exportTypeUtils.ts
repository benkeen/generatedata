import exportTypeConfig from '../../build/exportTypeConfig';
import { DropdownOption } from '../components/dropdown/Dropdown';

export const exportTypeOptions: DropdownOption[] = exportTypeConfig.map(({ name, folder }) => ({
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