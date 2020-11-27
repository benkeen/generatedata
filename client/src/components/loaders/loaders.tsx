import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as styles from './loaders.scss';

export const SmallSpinner = (props: any): any => (
	<CircularProgress
		disableShrink
		size={20}
		style={{ color: '#999999', margin: 5 }}
		{...props}
	/>
);

export const MediumSpinner = (props: any): any => (
	<CircularProgress
		disableShrink
		size={40}
		style={{ color: '#999999', margin: 5 }}
		{...props}
	/>
);

export const DialogLoadingSpinner = ({ visible }: any): JSX.Element | null => {
	if (!visible) {
		return null;
	}

	return (
		<div className={styles.dialogLoadingSpinner}>
			<MediumSpinner
				style={{ color: '#444444' }}
			/>
		</div>
	);
};
