import React from 'react';
import { PreviewPanelButton } from '~components/Buttons.component';
import * as styles from './DataSetHistory.styles.ts';

export type PanelButtonsProps = {
  selectVersion: () => void;
  selectedDataSetHistoryItem: {
    historyId: number | null;
    isLatest: boolean;
  };
  i18n: any;
};

export const PanelButtons = ({ selectVersion, selectedDataSetHistoryItem, i18n }: PanelButtonsProps) => {
  const { isLatest } = selectedDataSetHistoryItem;

  return (
    <div>
      <PreviewPanelButton onClick={selectVersion} className={styles.dataSetHistoryBtnClass} disabled={isLatest}>
        {i18n.revertToVersion}
      </PreviewPanelButton>
    </div>
  );
};
