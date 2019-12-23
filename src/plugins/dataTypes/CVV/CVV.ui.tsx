import * as React from 'react';
import { DataTypeUIHelpProps } from '../../../../types/general';

export const Help = ({ i18n }: DataTypeUIHelpProps) => (
	<p>{i18n.DATA_TYPE.DESC}</p>
);

