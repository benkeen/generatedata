import type { ETBundle } from '~typings/exportTypes';
import { Settings, getCodeMirrorMode, getDownloadFileInfo, isValid } from './CSV';
import { initialState } from './CSV.state';

const bundle: ETBundle = {
  Settings,
  initialState,
  getCodeMirrorMode,
  getDownloadFileInfo,
  isValid
};

export default bundle;
