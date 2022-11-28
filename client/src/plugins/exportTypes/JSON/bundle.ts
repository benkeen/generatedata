import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo } from './JSON';

export { GenerationOptionsType } from './JSON';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
