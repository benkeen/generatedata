import * as React from 'react';
import { DTHelpProps } from '../../../../types/dataTypes';

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<p>
		{i18n.DESC}<br />
		{i18n.help_1}<br />
		{i18n.help_2}<br />
	</p>
);
