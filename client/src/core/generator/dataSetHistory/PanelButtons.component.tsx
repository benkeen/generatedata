import React from 'react';
import Button from '@material-ui/core/Button';
import { GeneratorPanel } from '~types/general';
import * as styles from './DataSetHistory.scss';

export type PanelButtonsProps = {
	selectedPanel: GeneratorPanel;
	onClick: (panel: GeneratorPanel) => void;
	i18n: any;
};

export const PanelButtons = ({ selectedPanel, onClick, i18n }: PanelButtonsProps) => {
	return (
		<div>
			<Button
				disableElevation
				onClick={() => onClick(GeneratorPanel.preview)}
				variant="outlined"
				color="primary"
				className={styles.dataSetHistoryBtnClass}
				size="medium"
				style={{ marginRight: 10 }}>
				{i18n.preview}
			</Button>
			<Button
				disableElevation
				onClick={() => onClick(GeneratorPanel.grid)}
				variant="outlined"
				color="primary"
				size="medium"
				className={styles.dataSetHistoryBtnClass}>
				{i18n.grid}
			</Button>
		</div>
	);
};
