import { exportTypes, ExportTypeFolder } from '../_plugins';
import { ETBundle } from '../../types/exportTypes';

export const exportTypeNames = Object.keys(exportTypes).map((folder: ExportTypeFolder) => exportTypes[folder].name);

type LoadedExportTypes = {
	[name in ExportTypeFolder]?: ETBundle; // TODO figure this one out... kinda important
}

// this houses all Export Type code loaded async after the application starts
const loadedExportTypes: LoadedExportTypes = {};

export const exportTypeOptions = Object.keys(exportTypes)
	.map((exportType: ExportTypeFolder) => {
		return {
			value: exportType,
			label: exportTypes[exportType].name
		};
	});

export const loadExportTypeBundle = (exportType: ExportTypeFolder): any => {
	return new Promise((resolve, reject) => {
		import(
			/* webpackChunkName: "ET-[request]" */
			/* webpackMode: "lazy" */
			`../plugins/exportTypes/${exportType}/bundle`
		)
			.then((def: any) => {
				loadedExportTypes[exportType] = {
					definition: def.default,
					generate: def.generate,
					initialState: def.initialState,
					Preview: def.Preview,
					Settings: def.Settings
				};
				resolve(def);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

// assumes the callee knows what they're doing & that they've checked the component has been loaded
export const getExportTypePreview = (exportType: ExportTypeFolder): JSX.Element => loadedExportTypes[exportType]?.Preview;
