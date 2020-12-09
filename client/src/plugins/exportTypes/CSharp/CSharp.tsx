import { ETDownloadPacket, ETDownloadPacketResponse } from '~types/exportTypes';

export const getCodeMirrorMode = (): string => 'text/x-csharp';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.cs`,
	fileType: ''
});
