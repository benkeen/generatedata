import { exportTypes, ExportTypeFolder } from '../../_plugins';
import { ETBrowserBundle, ETDownloadPacketResponse, ETSettings } from '~types/exportTypes';
import C from '~core/constants';
import { getLocale, getStrings } from '~utils/langUtils';
import * as React from 'react';

export type LoadedExportTypes = {
	[name in ExportTypeFolder]?: ETBrowserBundle
}

// this houses all Export Type code loaded async after the application starts
const loadedExportTypes: LoadedExportTypes = {};

let cachedGroupedExportTypes: any;
let lastLocale: any;

export const getGroupedExportTypes = (): any => {
	const locale = getLocale();
	const i18n = getStrings();

	if (cachedGroupedExportTypes && lastLocale == locale) {
		return cachedGroupedExportTypes;
	}

	const groupI18nMap: any = {
		core: 'coreExportType',
		programmingLanguage: 'programmingLanguages'
	};

	lastLocale = locale;
	cachedGroupedExportTypes = C.EXPORT_TYPE_GROUPS.map((group: string) => {
		const options = Object.keys(exportTypes)
			.filter((exportType: ExportTypeFolder) => exportTypes[exportType].fieldGroup === group)
			.map((exportType: ExportTypeFolder) => ({
				value: exportType,
				label: i18n.exportTypes[exportType] ? i18n.exportTypes[exportType].EXPORT_TYPE_NAME : ''
			}));

		return {
			label: i18n.core[groupI18nMap[group]],
			options: options
		};
	});

	return cachedGroupedExportTypes;
};

export const DefaultSettings = ({ coreI18n }: ETSettings): JSX.Element => <div>{coreI18n.noAdditionalSettings}</div>;

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
						Settings: def.Settings || DefaultSettings,
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

		// TODO this reloads the code mirror modes multiple times unnecessarily

		const codeMirrorModes = exportTypes[exportType].codeMirrorModes.map((mode: string) => {
			return new Promise((resolve) => {
				const modeFile = document.createElement('script');
				modeFile.src = `./codeMirrorModes/${mode}.js`;
				modeFile.onload = (): void => {
					// @ts-ignore-line
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
	const et = loadedExportTypes[exportType] as ETBrowserBundle;
	return et.getExportTypeLabel ? et.getExportTypeLabel(settings) : null;
};

export const getExportTypeSettingsComponent = (exportType: ExportTypeFolder): any => {
	if (loadedExportTypes[exportType]) {
		const et = loadedExportTypes[exportType] as ETBrowserBundle;
		return et.Settings;
	}
	return null;
};

export const getExportTypeTitleValidationFunction = (exportType: ExportTypeFolder): any => {
	if (loadedExportTypes[exportType]?.validateTitleField) {
		const et = loadedExportTypes[exportType] as ETBrowserBundle;
		return et.validateTitleField;
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

