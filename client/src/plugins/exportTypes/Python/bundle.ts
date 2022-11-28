import { ETBundle } from '~types/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './Python';

export type GenerationOptionsType = null;

const bundle: ETBundle = {
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;

