import * as React from 'react';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~types/exportTypes';

export const Settings = ({ i18n }: ETSettings): JSX.Element => <div>{i18n.noAdditionalSettings}</div>;

export const getCodeMirrorMode = (): string => 'text/x-ruby';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => {
	return {
		filename: `data-${packetId}.pl`,
		fileType: ''
	};
};
