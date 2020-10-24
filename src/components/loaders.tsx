import React from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

export const SmallSpinner = (): any => <CircularProgress disableShrink size={20} style={{ color: '#999999', margin: 5 }} />;
export const MediumSpinner = (props: any): any => (
	<CircularProgress
		disableShrink size={40}
		style={{ color: '#999999', margin: 5 }}
		{...props}
	/>
);

export const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }): JSX.Element => (
	<div style={{ position: 'relative', display: 'inline-flex' }}>
		<CircularProgress variant="static" {...props} />
		<div style={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			{`${Math.round(props.value)}%`}
		</div>
	</div>
);

