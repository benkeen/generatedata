import * as React from 'react';
import { DataTypeUIHelpProps } from '../../../../types/general';

export const Help = ({ i18n }: DataTypeUIHelpProps) => (
	<p>
		{i18n.DATA_TYPE.DESC}<br />
		{i18n.help_1}<br />
		{i18n.help_2}<br />
	</p>
);
