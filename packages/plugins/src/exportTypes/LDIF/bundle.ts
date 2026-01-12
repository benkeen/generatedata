import type { ETBundle } from '~typings/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './LDIF';

const bundle: ETBundle = {
  getCodeMirrorMode,
  getDownloadFileInfo
};

export default bundle;
