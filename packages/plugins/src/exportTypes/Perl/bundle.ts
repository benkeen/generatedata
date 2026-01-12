import type { ETBundle } from '~typings/exportTypes';
import { getCodeMirrorMode, getDownloadFileInfo } from './Perl';

const bundle: ETBundle = {
  getCodeMirrorMode,
  getDownloadFileInfo
};

export default bundle;
