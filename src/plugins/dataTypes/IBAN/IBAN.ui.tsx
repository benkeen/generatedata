import * as React from 'react';
import { HelpProps } from '../../../../types/dataTypes';

export const Help = ({ i18n }: HelpProps): JSX.Element => (
	<p>
		{i18n.DATA_TYPE.DESC}<br />
		{i18n.help_1}<br />
		{i18n.help_2}<br />
	</p>
);
