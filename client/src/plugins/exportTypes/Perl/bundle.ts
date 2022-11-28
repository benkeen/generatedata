import { ETBundle } from '~types/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './Perl';

export type GenerationOptionsType = null;

const bundle: ETBundle = {
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
