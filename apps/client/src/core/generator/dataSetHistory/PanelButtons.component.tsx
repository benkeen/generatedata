import React from 'react';
import { PreviewPanelButton } from '@generatedata/shared';
import { useClasses } from './DataSetHistory.styles';

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
  const classNames = useClasses();

  return (
    <div>
      <PreviewPanelButton onClick={selectVersion} className={classNames.dataSetHistoryBtnClass} disabled={isLatest}>
        {i18n.revertToVersion}
      </PreviewPanelButton>
    </div>
  );
};
