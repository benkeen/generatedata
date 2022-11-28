import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo } from './HTML';

export { GenerationOptionsType } from './HTML';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
