import type { ETBundle } from '~typings/exportTypes';
import { Settings, getCodeMirrorMode, getDownloadFileInfo, isValid } from './Typescript';
import { initialState } from './Typescript.state';

const bundle: ETBundle = {
  initialState,
  Settings,
  getCodeMirrorMode,
  getDownloadFileInfo,
  isValid
};

export default bundle;
