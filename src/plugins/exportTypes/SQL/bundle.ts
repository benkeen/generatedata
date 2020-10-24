import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getExportTypeLabel, validateTitleField, getDownloadFileInfo,
	isValid } from './SQL';

const bundle: ETBundle = {
	Settings,
	initialState,
	getExportTypeLabel,
	getCodeMirrorMode,
	validateTitleField,
	isValid,
	getDownloadFileInfo
};

export default bundle;
