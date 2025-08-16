import * as React from 'react';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import etShared from '../../../styles/etShared.scss';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~types/exportTypes';
import { ExportFormat } from './HTML.state';

export const Settings = ({ i18n, id, data, onUpdate }: ETSettings): JSX.Element => {
	const onChange = (exportFormat: ExportFormat): void => {
		onUpdate({
			...data,
			exportFormat
		});
	};

	return (
		<div className={etShared.settingRow}>
			<label>{i18n.dataFormat}</label>
			<RadioPillRow>
				<RadioPill
					label="table"
					onClick={(): void => onChange('table')}
					name={`${id}-dataFormat`}
					checked={data.exportFormat === 'table'}
				/>
				<RadioPill
					label="ul"
					onClick={(): void => onChange('ul')}
					name={`${id}-dataFormat`}
					checked={data.exportFormat === 'ul'}
				/>
				<RadioPill
					label="dl"
					onClick={(): void => onChange('dl')}
					name={`${id}-dataFormat`}
					checked={data.exportFormat === 'dl'}
				/>
			</RadioPillRow>
		</div>
	);
};

export const getCodeMirrorMode = (): string => 'text/html';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.html`,
	fileType: 'text/html'
});
