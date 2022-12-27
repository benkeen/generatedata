import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo, validateTitleField } from './XML';
import { generate } from './XML.generate';

export { GenerationOptionsType } from './XML';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo,
	validateTitleField,
	generate
};

export default bundle;
