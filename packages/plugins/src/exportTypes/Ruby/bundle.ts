import type { ETBundle } from '~typings/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './Ruby';

const bundle: ETBundle = {
  getCodeMirrorMode,
  getDownloadFileInfo
};

export default bundle;
