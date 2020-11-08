import * as React from 'react';
import TextField from '~components/TextField';
import { ETDownloadPacket, ETDownloadPacketResponse } from '~types/exportTypes';

export type CSVSettings = {
    delimiter: string;
	lineEndings: 'Windows' | 'Unix' | 'Mac';
};

export const initialState: CSVSettings = {
	delimiter: ',',
	lineEndings: 'Unix'
};

export const Settings = ({ i18n, id, data, onUpdate }: any): JSX.Element => {
	const onChange = (prop: string, value: string): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	return (
		<div>
			<div>
				<label>{i18n.delimiterChars}</label>
				<TextField
					id={`${id}-delimiter`}
					value={data.delimiter}
					onChange={(e: any) => onChange('delimiter', e.target.value)}
				/>
			</div>
			<div>
				<label>{i18n.eolChar}</label>
				<select id={`${id}-eolChar`}>
					<option value="Windows">Windows</option>
					<option value="Unix">Unix</option>
					<option value="Mac">Mac</option>
				</select>
			</div>
		</div>
	);
};

export const getCodeMirrorMode = (): string => 'application/csv';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.csv`,
	fileType: 'application/csv'
});
