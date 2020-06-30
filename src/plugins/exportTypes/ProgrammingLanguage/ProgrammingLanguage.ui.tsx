import * as React from 'react';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import styles from './ProgrammingLanguage.scss';

export type JavascriptExportFormat = 'variable' | 'es6' | 'commonJs';
export type ProgrammingLanguageState = {
	language: 'CSharp' | 'JavaScript' | 'Perl' | 'PHP' | 'Ruby';
	jsExportFormat: JavascriptExportFormat;
};

export const initialState: ProgrammingLanguageState = {
	language: 'Perl',
	jsExportFormat: 'variable'
};

const options: DropdownOption[] = [
	{ value: 'CSharp', label: 'C# (anonymous object)' },
	{ value: 'JavaScript', label: 'JavaScript' },
	{ value: 'Perl', label: 'Perl' },
	{ value: 'PHP', label: 'PHP' },
	{ value: 'Ruby', label: 'Ruby' }
];

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
					Export format
					<RadioPillRow>
						<RadioPill
							label="Variable"
							onClick={(): void => onChange('jsExportFormat', 'variable')}
							name={`${id}-js-export-format`}
							checked={data.jsExportFormat === 'variable'}
						/>
						<RadioPill
							label="ES6 export"
							onClick={(): void => onChange('jsExportFormat', 'es6')}
							name={`${id}-js-export-format`}
							checked={data.jsExportFormat === 'es6'}
						/>
						<RadioPill
							label="Common JS export"
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

















