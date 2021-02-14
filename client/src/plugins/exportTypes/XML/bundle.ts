import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo, validateTitleField } from './XML';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo,
	validateTitleField
};

export default bundle;
