import { ETBundle } from '@generatedata/types';
import { Settings, getCodeMirrorMode, getDownloadFileInfo, validateTitleField } from './XML';
import { initialState } from './XML.state';

const bundle: ETBundle = {
  Settings,
  initialState,
  getCodeMirrorMode,
  getDownloadFileInfo,
  validateTitleField
};

export default bundle;
