import { ETBundle } from '~types/exportTypes';
import { initialState, Settings, getCodeMirrorMode, getDownloadFileInfo, isValid } from './Typescript';

const bundle: ETBundle = {
	initialState,
	Settings,
	getCodeMirrorMode,
	getDownloadFileInfo,
	isValid
};

export default bundle;
