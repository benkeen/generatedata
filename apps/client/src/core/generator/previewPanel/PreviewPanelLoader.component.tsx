import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './PreviewPanel.scss';

export const PreviewPanelLoader = (): any => (
	<div className={styles.loading}>
		<div style={{ flex: 'none' }}>
			<CircularProgress
				size={50}
				style={{
					color: '#ffffff',
					margin: 5,
					opacity: 0.4
				}}
			/>
		</div>
	</div>
);
PreviewPanelLoader.displayName = 'PreviewPanelLoader';
