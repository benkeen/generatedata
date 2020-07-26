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


// TODO error scenarios
export const loadExportTypeBundle = (exportType: ExportTypeFolder): any => {
	const etBundle = new Promise((resolve, reject) => {
		import(
			/* webpackChunkName: "ET-[request]" */
			/* webpackMode: "lazy" */
			`../plugins/exportTypes/${exportType}/bundle`
		)
			.then((def: any) => {
				loadedExportTypes[exportType] = {
					Settings: def.Settings,
					initialState: def.initialState,
					getExportTypeLabel: def.getExportTypeLabel,
					getCodeMirrorMode: def.getCodeMirrorMode
				};
				resolve(def);
			})
			.catch((e) => {
				reject(e);
			});
	});

	const codeMirrorModes = exportTypes[exportType].codeMirrorModes.map((mode) => {
		return new Promise((resolve) => {
			const modeFile = document.createElement('script');
			modeFile.src = `./codeMirrorModes/${mode}.js`;
			modeFile.onload = (): void => {
				resolve();
			};
			document.body.appendChild(modeFile);
		});
	});

	return Promise.all([...codeMirrorModes, etBundle]);
};

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

export const getCodeMirrorMode = (exportType: ExportTypeFolder, exportTypeSettings: any): string => {
	// @ts-ignore-line
	return loadedExportTypes[exportType].getCodeMirrorMode(exportTypeSettings);
};
