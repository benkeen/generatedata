import { ETBundle } from '@generatedata/types';
import { Settings, getCodeMirrorMode, getDownloadFileInfo } from './Javascript';
import { initialState } from './Javascript.state';

const bundle: ETBundle = {
  Settings,
  initialState,
  getCodeMirrorMode,
  getDownloadFileInfo
};

export default bundle;
