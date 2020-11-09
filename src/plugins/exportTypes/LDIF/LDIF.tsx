import React from 'react';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~types/exportTypes';

export const Settings = ({ i18n }: ETSettings): JSX.Element => <div>{i18n.noAdditionalSettings}</div>;

export const getCodeMirrorMode = (): string => 'text/x-yaml';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.ldf`,
	fileType: 'application/csv'
});
