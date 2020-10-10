import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getExportTypeLabel, validateTitleField, getDownloadFileInfo } from './SQL';

const bundle: ETBundle = {
	Settings,
	initialState,
	getExportTypeLabel,
	getCodeMirrorMode,
	validateTitleField,
	getDownloadFileInfo
};

export default bundle;
