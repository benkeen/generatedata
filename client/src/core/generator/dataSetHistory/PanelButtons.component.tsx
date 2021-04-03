import React from 'react';
import Button from '@material-ui/core/Button';
import * as styles from './DataSetHistory.scss';

export type PanelButtonsProps = {
	selectVersion: () => void;
	i18n: any;
};

export const PanelButtons = ({ selectVersion, i18n }: PanelButtonsProps) => {
	return (
		<div>
			<Button
				disableElevation
				onClick={selectVersion}
				variant="outlined"
				color="primary"
				className={styles.dataSetHistoryBtnClass}
				size="medium"
				style={{ marginRight: 10 }}>
				Reinstate this version
			</Button>
		</div>
	);
};
