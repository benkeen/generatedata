import { ETDownloadPacket, ETDownloadPacketResponse } from '~types/exportTypes';

export const getCodeMirrorMode = (): string => 'text/x-php';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.php`,
	fileType: ''
});
