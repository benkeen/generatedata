import * as React from 'react';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import styles from './ProgrammingLanguage.scss';
import { ETDownloadPacket, ETDownloadPacketResponse, ETState } from '~types/exportTypes';

export type JavascriptExportFormat = 'variable' | 'es6' | 'commonJs';
export interface ProgrammingLanguageState extends ETState {
	language: 'CSharp' | 'JavaScript' | 'Perl' | 'PHP' | 'Ruby';
	jsExportFormat: JavascriptExportFormat;
}

export const initialState: ProgrammingLanguageState = {
	language: 'Perl',
	jsExportFormat: 'variable',
	isValid: true
};

const langMap: { [str: string]: string } = {
	CSharp: 'C#',
	JavaScript: 'JavaScript',
	Perl: 'Perl',
	PHP: 'PHP',
	Ruby: 'Ruby'
};

const options: DropdownOption[] = Object.keys(langMap).map((key) => ({ value: key, label: langMap[key] }));

export const Settings = ({ i18n, id, data, onUpdate }: any): JSX.Element => {
	const onChange = (prop: string, value: any): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	const getSettings = (): React.ReactNode => {
		if (data.language === 'JavaScript') {
			return (
				<div className={styles.jsExportFormat}>
					{i18n.format}
					<RadioPillRow>
						<RadioPill
							label={i18n.variable}
							onClick={(): void => onChange('jsExportFormat', 'variable')}
							name={`${id}-js-export-format`}
							checked={data.jsExportFormat === 'variable'}
						/>
						<RadioPill
							label={i18n.es6Format}
							onClick={(): void => onChange('jsExportFormat', 'es6')}
							name={`${id}-js-export-format`}
							checked={data.jsExportFormat === 'es6'}
						/>
						<RadioPill
							label={i18n.commonJsFormat}
							onClick={(): void => onChange('jsExportFormat', 'commonJs')}
							name={`${id}-js-export-format`}
							checked={data.jsExportFormat === 'commonJs'}
						/>
					</RadioPillRow>
				</div>
			);
		}
		return null;
	};

	return (
		<>
			{i18n.language}
			<Dropdown
				value={data.language}
				onChange={(item: any): any => onChange('language', item.value)}
				options={options}
			/>
			{getSettings()}
		</>
	);
};

export const getExportTypeLabel = (data: ProgrammingLanguageState): string => data ? langMap[data.language] : '';

export const getCodeMirrorMode = (settings: ProgrammingLanguageState): any => {
	const modes = {
		JavaScript: 'text/javascript',
		CSharp: 'text/x-csharp',
		Perl: 'text/x-perl',
		PHP: 'text/x-php',
		Ruby: 'text/x-ruby'
	};
	return modes[settings.language];
};

export const getDownloadFileInfo = ({ packetId, settings }: ETDownloadPacket): ETDownloadPacketResponse => {
	const map = {
		CSharp: { extension: 'cs', fileType: '' },
		JavaScript: { extension: 'js', fileType: '' },
		Perl: { extension: 'pl', fileType: '' },
		PHP: { extension: 'php', fileType: '' },
		Ruby: { extension: 'rb', fileType: '' }
	};

	// @ts-ignore-line
	const { fileType, extension } = map[settings.language];

	return {
		filename: `data-${packetId}.${extension}`,
		fileType
	};
};
