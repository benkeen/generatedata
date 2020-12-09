import { ETDownloadPacket, ETDownloadPacketResponse } from '~types/exportTypes';

export const getCodeMirrorMode = (): string => 'text/x-ruby';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.pl`,
	fileType: ''
});
