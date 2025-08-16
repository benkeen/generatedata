import { ETDownloadPacket, ETDownloadPacketResponse } from '@generatedata/types';

export const getCodeMirrorMode = (): string => 'text/x-perl';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.pl`,
  fileType: ''
});
