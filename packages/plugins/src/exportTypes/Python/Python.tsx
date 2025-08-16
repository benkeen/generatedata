import { ETDownloadPacket, ETDownloadPacketResponse } from '@generatedata/types';

export const getCodeMirrorMode = (): string => 'text/x-python';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
  filename: `data-${packetId}.py`,
  fileType: ''
});
