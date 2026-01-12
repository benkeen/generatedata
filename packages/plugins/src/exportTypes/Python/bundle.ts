import type { ETBundle } from '~typings/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './Python';

const bundle: ETBundle = {
  getCodeMirrorMode,
  getDownloadFileInfo
};

export default bundle;
