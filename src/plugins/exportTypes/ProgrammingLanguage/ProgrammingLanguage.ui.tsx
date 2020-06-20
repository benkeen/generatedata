import * as React from 'react';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';

export type ProgrammingLanguageState = {
	language: 'CSharp' | 'JavaScript' | 'Perl' | 'PHP' | 'Ruby';
};

export const initialState: ProgrammingLanguageState = {
	language: 'Perl'
};

const options: DropdownOption[] = [
	{ value: 'CSharp', label: 'C# (anonymous object)' },
	{ value: 'JavaScript', label: 'JavaScript' },
	{ value: 'Perl', label: 'Perl' },
	{ value: 'PHP', label: 'PHP' },
	{ value: 'Ruby', label: 'Ruby' }
];

export const Settings = ({ i18n, data, onUpdate }: any): JSX.Element => {
	const onChange = (language: string): void => {
		onUpdate({
			...data,
			language
		});
	};
	return (
		<>
			{i18n.language}
			<Dropdown
				value={data.language}
				onChange={(item: any): any => onChange(item.value)}
				options={options}
			/>
		</>
	);
};
