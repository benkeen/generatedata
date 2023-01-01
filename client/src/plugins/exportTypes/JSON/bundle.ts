import { ETBundle } from '~types/exportTypes';
import { Settings, getCodeMirrorMode, getDownloadFileInfo } from './JSON';
import { initialState } from './JSON.state';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
