import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo, isValid } from './CSV';
import { generate } from './CSV.generate';

export { CSVSettings as GenerationOptionsType } from './CSV';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo,
	isValid,
	generate
};

export default bundle;
