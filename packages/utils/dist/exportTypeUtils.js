import { exportTypes } from '../../_plugins';
import C from '~core/constants';
import { getLocale, getStrings } from '~utils/langUtils';
import * as React from 'react';
// this houses all Export Type code loaded async after the application starts
const loadedExportTypes = {};
let cachedGroupedExportTypes;
let lastLocale;
export const getGroupedExportTypes = () => {
    const locale = getLocale();
    const i18n = getStrings();
    if (cachedGroupedExportTypes && lastLocale == locale) {
        return cachedGroupedExportTypes;
    }
    const groupI18nMap = {
        core: 'coreExportType',
        programmingLanguage: 'programmingLanguages'
    };
    lastLocale = locale;
    cachedGroupedExportTypes = C.EXPORT_TYPE_GROUPS.map((group) => {
        const options = Object.keys(exportTypes)
            .filter((exportType) => exportTypes[exportType].fieldGroup === group)
            .map((exportType) => ({
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
export const DefaultSettings = ({ coreI18n }) => <div>{coreI18n.noAdditionalSettings}</div>;
// TODO error scenarios
export const loadExportTypeBundle = (exportType) => {
    return new Promise((mainResolve) => {
        const etBundle = new Promise((resolve, reject) => {
            import(
            /* webpackChunkName: "ET-[request]" */
            /* webpackMode: "lazy" */
            `../plugins/exportTypes/${exportType}/bundle`)
                .then((resp) => {
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
        const codeMirrorModes = exportTypes[exportType].codeMirrorModes.map((mode) => {
            return new Promise((resolve) => {
                const normalizedMode = mode.replace('/', '_');
                const id = `mode-${normalizedMode}`;
                // if the codemirror mode was already inserted, don't bother doing it again
                if (document.getElementById(id)) {
                    // @ts-ignore-line
                    resolve();
                    return;
                }
                const modeFile = document.createElement('script');
                modeFile.src = `./codeMirrorModes/${mode}.js`;
                modeFile.id = id;
                modeFile.onload = () => {
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
export const getExportTypeInitialState = (exportType) => loadedExportTypes[exportType].initialState;
// *** assumes the callee knows what they're doing & that they've checked the component has been loaded
export const getExportTypeLabel = (exportType, settings) => {
    const et = loadedExportTypes[exportType];
    return et.getExportTypeLabel ? et.getExportTypeLabel(settings) : null;
};
export const getExportTypeSettingsComponent = (exportType) => {
    if (loadedExportTypes[exportType]) {
        const et = loadedExportTypes[exportType];
        return et.Settings;
    }
    return null;
};
export const getExportTypeTitleValidationFunction = (exportType) => {
    var _a;
    if ((_a = loadedExportTypes[exportType]) === null || _a === void 0 ? void 0 : _a.validateTitleField) {
        const et = loadedExportTypes[exportType];
        return et.validateTitleField;
    }
    return null;
};
export const getCodeMirrorMode = (exportType, exportTypeSettings) => {
    // @ts-ignore-line
    return loadedExportTypes[exportType].getCodeMirrorMode(exportTypeSettings);
};
export const getDownloadFileInfo = (packetId, exportType, exportTypeSettings) => {
    // @ts-ignore-line
    return loadedExportTypes[exportType].getDownloadFileInfo({
        packetId,
        settings: exportTypeSettings
    });
};
export const isExportTypeValid = (exportType, exportTypeSettings) => {
    if (!loadedExportTypes || !loadedExportTypes[exportType]) {
        return true;
    }
    const et = loadedExportTypes[exportType];
    if (et.isValid) {
        return et.isValid(exportTypeSettings);
    }
    return true;
};
//# sourceMappingURL=exportTypeUtils.js.map