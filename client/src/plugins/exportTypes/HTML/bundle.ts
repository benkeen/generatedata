import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo } from './HTML';
import { generate } from './HTML.generate';

export { GenerationOptionsType } from './HTML';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo,
	generate
};

export default bundle;
