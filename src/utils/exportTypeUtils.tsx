import { exportTypes, ExportTypeFolder } from '../_plugins';
import { MediumSpinner } from '~components/loaders';
import { ETBundle } from '~types/exportTypes';

export const exportTypeNames = Object.keys(exportTypes).map((folder: ExportTypeFolder) => exportTypes[folder].name);

type LoadedExportTypes = {
	[name in ExportTypeFolder]?: ETBundle
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
					generate: def.generate,
					initialState: def.initialState,
					getExportTypeLabel: def.getExportTypeLabel,
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

// *** assumes the callee knows what they're doing & that they've checked the component has been loaded
export const getExportTypePreview = (exportType: ExportTypeFolder): JSX.Element => loadedExportTypes[exportType]?.Preview;

// *** assumes the callee knows what they're doing & that they've checked the component has been loaded
export const getExportTypeLabel = (exportType: ExportTypeFolder, settings: any): string | null => {
	const et = loadedExportTypes[exportType] as ETBundle;
	return et.getExportTypeLabel ? et.getExportTypeLabel(settings) : null;
};

export const getExportTypeSettingsComponent = (exportType: ExportTypeFolder): any => {
	if (loadedExportTypes[exportType]) {
		const et = loadedExportTypes[exportType] as ETBundle;
		return et.Settings;
	}
	return MediumSpinner;
};

