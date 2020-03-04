import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';

export const initialState = {
	value: ''
};

export const Example = ({ i18n }: DTExampleProps): string => i18n.see_help_dialog;

export const Options = ({ data, onUpdate }: DTOptionsProps): JSX.Element => (
	<textarea onChange={(e): void => onUpdate({ value: e.target.value })} value={data.value} />
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
		</p>
		<p>
			{i18n.Composite_help_2}
		</p>
		<p>
			{i18n.Composite_help_3}
		</p>
		<ul>
			<li>{i18n.Composite_help_4}</li>
			<li>{i18n.Composite_help_5}
				<ul>
					<li><b>ROW2-ROW</b> - {i18n.Composite_subtraction}</li>
					<li><b>ROW2*ROW</b> - {i18n.Composite_multiplication}</li>
					<li><b>ROW2/ROW</b> - {i18n.Composite_division}</li>
				</ul>
			</li>
			<li>
				{i18n.Composite_help_6}
				<b>if ROW1 == 5 i18n.Composite_na else ROW1</b>
			</li>
		</ul>
		<p>
			{i18n.Composite_help_7}
		</p>
	</>
);


// var _validate = function() {
// 	return [];
// };
