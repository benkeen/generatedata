import { ETBundle } from '~types/exportTypes';
import { Settings, getCodeMirrorMode, getDownloadFileInfo } from './Javascript';
import { initialState } from './Javascript.state';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;

