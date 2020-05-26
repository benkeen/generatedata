import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export type ConstantState = {
	loopCount: number;
	values: string;
}

export const initialState: ConstantState = {
	loopCount: 10,
	values: ''
};

export const Example = ({ coreI18n }: DTExampleProps): string => coreI18n.seeHelpDialog;

export const Options = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<div>
			<div style={{ marginBottom: 2 }}>
				{i18n.loopCount}
				<input
					type="number"
					value={data.loopCount}
					style={{ width: 50 }}
					onChange={(e): void => onChange('loopCount', e.target.value)} />
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{i18n.values}
				<input
					value={data.values}
					style={{ width: '100%', marginLeft: 2 }}
					onChange={(e): void => onChange('values', e.target.value)} />
			</div>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help1}
		</p>
		<ul>
			<li>{i18n.help2}</li>
			<li>{i18n.help3}</li>
			<li>{i18n.help4}</li>
		</ul>
		<p>
			{i18n.help5}
		</p>
	</>
);
