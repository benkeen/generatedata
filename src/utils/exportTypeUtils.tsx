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
		// let mainPluginLoaded = false;
		// let codeMirrorModesLoaded = false;
		// let numCodeMirrorModes = 0;

		// import the main code
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
				// resolve(def);
			})
			.catch((e) => {
				reject(e);
			});

		// load the code mirror mode files.
		exportTypes[exportType].codeMirrorModes.map((mode) => {
			import(
				/* webpackChunkName: "codeMirror-[request]" */
				/* webpackMode: "lazy" */
				`../../node_modules/codemirror/mode/${mode}`
			)
			.then(() => {
				console.log("loaded: ", mode);
			});
		});
	});
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

