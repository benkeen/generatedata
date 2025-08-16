import { ETBundle } from '@generatedata/types';
import { Settings, getCodeMirrorMode, getExportTypeLabel, validateTitleField, getDownloadFileInfo, isValid } from './SQL';
import { initialState } from './SQL.state';

const bundle: ETBundle = {
  Settings,
  initialState,
  getExportTypeLabel,
  getCodeMirrorMode,
  validateTitleField,
  isValid,
  getDownloadFileInfo
};

export default bundle;
