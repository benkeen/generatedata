import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getExportTypeLabel, getCodeMirrorMode, getDownloadFileInfo } from './ProgrammingLanguage';

const bundle: ETBundle = {
	Settings,
	initialState,
	getExportTypeLabel,
	getCodeMirrorMode,
	getDownloadFileInfo
};

export default bundle;

