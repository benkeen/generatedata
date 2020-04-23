import * as React from 'react';
import { DTHelpProps } from '../../../../types/dataTypes';

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: i18n.DESC }} />
		<p>
			<span dangerouslySetInnerHTML={{ __html: i18n.help1 }} /> <span dangerouslySetInnerHTML={{ __html: i18n.help2 }} />
		</p>
	</>
);
