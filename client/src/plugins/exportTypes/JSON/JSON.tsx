import * as React from 'react';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~types/exportTypes';
import etShared from '../../../styles/etShared.scss';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';

export const Settings = ({ data, id, i18n, onUpdate }: ETSettings): JSX.Element => {
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<div className={etShared.settingRow}>
			<label>{i18n.dataStructureFormat}</label>

			<RadioPillRow>
				<RadioPill
					label={i18n.simple}
					onClick={(): void => onChange('dataStructureFormat', 'simple')}
					name={`${id}-simple`}
					checked={data.dataStructureFormat === 'simple'}
				/>
				<RadioPill
					label={i18n.complex}
					onClick={(): void => onChange('dataStructureFormat', 'complex')}
					name={`${id}-complex`}
					checked={data.dataStructureFormat === 'complex'}
				/>
			</RadioPillRow>
		</div>
	);
};

export const getCodeMirrorMode = (): string => 'application/ld+json';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.json`,
	fileType: 'application/json'
});
