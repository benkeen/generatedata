import type { ETDownloadPacket, ETDownloadPacketResponse } from '~typings/exportTypes';

export const getCodeMirrorMode = (): string => 'text/x-yaml';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.ldf`,
  fileType: 'application/csv'
});
