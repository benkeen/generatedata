import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo } from './JSON';
import { generate } from './JSON.generate';

export { GenerationOptionsType } from './JSON';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo,
	generate
};

export default bundle;
