import type { ETBundle } from '~typings/exportTypes';
import { Settings, getCodeMirrorMode, getDownloadFileInfo } from './HTML';
import { initialState } from './HTML.state';

const bundle: ETBundle = {
  Settings,
  initialState,
  getCodeMirrorMode,
  getDownloadFileInfo
};

export default bundle;
