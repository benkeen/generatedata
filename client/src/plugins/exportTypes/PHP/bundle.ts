import { ETBundle } from '~types/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './PHP';

export type GenerationOptionsType = null;

const bundle: ETBundle = {
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
