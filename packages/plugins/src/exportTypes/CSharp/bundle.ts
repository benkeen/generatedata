import type { ETBundle } from '~typings/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './CSharp';

const bundle: ETBundle = {
  getCodeMirrorMode,
  getDownloadFileInfo
};

export default bundle;
