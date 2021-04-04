import React from 'react';
import { PreviewPanelButton } from '~components/Buttons.component';
import * as styles from './DataSetHistory.scss';

export type PanelButtonsProps = {
	selectVersion: () => void;
	selectedDataSetHistoryItem: {
		historyId: number | null;
		isLatest: boolean;
	};
	i18n: any;
};

export const PanelButtons = ({ selectVersion, selectedDataSetHistoryItem, i18n }: PanelButtonsProps): JSX.Element => {
	const { isLatest } = selectedDataSetHistoryItem;

	return (
		<div>
			<PreviewPanelButton
				onClick={selectVersion}
				className={styles.dataSetHistoryBtnClass}
				disabled={isLatest}>
				{i18n.revertToVersion}
			</PreviewPanelButton>
		</div>
	);
};
