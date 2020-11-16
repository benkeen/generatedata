import { ETBundle } from '~types/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo, Settings } from './LDIF';

const bundle: ETBundle = {
	Settings,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;
