import * as React from 'react';
import TextField from '~components/TextField';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { ETDownloadPacket, ETDownloadPacketResponse } from '~types/exportTypes';
import styles from './CSV.scss';

export type CSVSettings = {
    delimiter: string;
	lineEndings: 'Windows' | 'Unix' | 'Mac';
};

export const initialState: CSVSettings = {
	delimiter: ',',
	lineEndings: 'Unix'
};

const options = [
	{ value: 'Windows', label: 'Windows' },
	{ value: 'Unix', label: 'Unix' },
	{ value: 'Mac', label: 'Mac' }
];

export const Settings = ({ i18n, id, data, onUpdate }: any): JSX.Element => {
	const onChange = (prop: string, value: string): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	return (
		<div className={styles.settings}>
			<div>
				<label>{i18n.delimiterChars}</label>
				<TextField
					error={data.delimiter ? '' : i18n.validationNoDelimiter}
					style={{ width: 30 }}
					id={`${id}-delimiter`}
					value={data.delimiter}
					onChange={(e: any): void => onChange('delimiter', e.target.value)}
				/>
			</div>
			<div>
				<label>{i18n.eolChar}</label>
				<Dropdown
					id={`${id}-eolChar`}
					value={data.lineEndings}
					options={options}
					onChange={({ value }: DropdownOption): void => onChange('lineEndings', value)}
				/>
			</div>
		</div>
	);
};

// CSV supplies their own custom Preview component, since showing raw CSV code via CodeMirror isn't much of a preview.
// Instead, this simply renders the preview data as a table - closer to what they're actually going to end up with
// TODO
// export const Preview = () => {
//
// };

export const getCodeMirrorMode = (): string => 'application/csv';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.csv`,
	fileType: 'application/csv'
});

export const isValid = (settings: CSVSettings): boolean => {
	return settings.delimiter !== ''; // technically spaces are valid, I suppose
};
