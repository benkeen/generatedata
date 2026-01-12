import type { ETDownloadPacket, ETDownloadPacketResponse } from '~typings/exportTypes';

export const getCodeMirrorMode = (): string => 'text/x-python';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.py`,
  fileType: ''
});
