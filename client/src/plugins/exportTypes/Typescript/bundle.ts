import { ETBundle } from '~types/exportTypes';
import { initialState, Settings, getCodeMirrorMode, getDownloadFileInfo, isValid } from './Typescript';
import { generate } from './Typescript.generate';

export { GenerationOptionsType } from './Typescript';

const bundle: ETBundle = {
	initialState,
	Settings,
	getCodeMirrorMode,
	getDownloadFileInfo,
	isValid,
	generate
};

export default bundle;
