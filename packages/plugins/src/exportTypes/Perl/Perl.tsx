import type { ETDownloadPacket, ETDownloadPacketResponse } from '~typings/exportTypes';

export const getCodeMirrorMode = (): string => 'text/x-perl';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.pl`,
  fileType: ''
});
