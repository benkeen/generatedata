import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo } from './Javascript';

export { GenerationOptionsType } from './Javascript';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;

