import { ETBundle } from '~types/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './CSharp';

export type GenerationOptionsType = null;

const bundle: ETBundle = {
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
