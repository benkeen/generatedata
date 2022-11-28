import { ETBundle } from '~types/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './LDIF';

export type GenerationOptionsType = null;

const bundle: ETBundle = {
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
