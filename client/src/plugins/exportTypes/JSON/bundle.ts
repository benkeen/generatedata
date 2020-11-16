import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo } from './JSON';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
