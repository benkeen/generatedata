import { exportTypes, ExportTypeFolder } from '../_plugins';
import { ETBundle, ETDownloadPacketResponse } from '~types/exportTypes';

export const exportTypeNames = Object.keys(exportTypes).map((folder: ExportTypeFolder) => exportTypes[folder].name);

export type LoadedExportTypes = {
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
	return new Promise((mainResolve) => {
		const etBundle = new Promise((resolve, reject) => {
			import(
				/* webpackChunkName: "ET-[request]" */
				/* webpackMode: "lazy" */
				`../plugins/exportTypes/${exportType}/bundle`
			)
				.then((resp: any) => {
					const def = resp.default;
					loadedExportTypes[exportType] = {
						Settings: def.Settings,
						initialState: def.initialState,
						getExportTypeLabel: def.getExportTypeLabel,
						getDownloadFileInfo: def.getDownloadFileInfo,
						getCodeMirrorMode: def.getCodeMirrorMode,
						validateTitleField: def.validateTitleField,
						isValid: def.isValid
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

		Promise.all([...codeMirrorModes, etBundle])
			.then(() => {
				mainResolve(etBundle);
			});
	});
};

// *** assumes the callee knows what they're doing & that they've checked the component has been loaded
export const getExportTypeInitialState = (exportType: ExportTypeFolder): any => loadedExportTypes[exportType]!.initialState;

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
	return null;
};

export const getCodeMirrorMode = (exportType: ExportTypeFolder, exportTypeSettings: any): string => {
	// @ts-ignore-line
	return loadedExportTypes[exportType].getCodeMirrorMode(exportTypeSettings);
};

export const getDownloadFileInfo = (packetId: string, exportType: ExportTypeFolder, exportTypeSettings: any): ETDownloadPacketResponse => {
	// @ts-ignore-line
	return loadedExportTypes[exportType].getDownloadFileInfo({
		packetId,
		settings: exportTypeSettings
	});
};

export const isExportTypeValid = (exportType: ExportTypeFolder, exportTypeSettings: any): boolean => {
	if (!loadedExportTypes || !loadedExportTypes[exportType]) {
		return true;
	}

	const et = loadedExportTypes![exportType]!;
	if (et.isValid) {
		return et.isValid(exportTypeSettings);
	}

	return true;
};

