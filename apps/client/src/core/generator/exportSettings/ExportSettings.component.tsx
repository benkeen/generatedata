import * as React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PreviewSettingsTab from './PreviewSettingsTab.container';
import ExportTypeTab from './ExportTypeTab.container';
import { useClasses } from './ExportSettings.styles';
import { PrimaryButton } from '@generatedata/shared';

export type ExportSettingsProps = {
  i18n: any;
  showExportSettings: boolean;
  toggleExportSettings: any;
};

export const ExportSettings = ({ i18n, showExportSettings, toggleExportSettings }: ExportSettingsProps): React.ReactElement => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const classNames = useClasses();
  const handleChange = (_e: React.SyntheticEvent, newValue: number): void => setSelectedTabIndex(newValue);
  const getTab = () => {
    if (selectedTabIndex === 0) {
      return <ExportTypeTab />;
    } else {
      return <PreviewSettingsTab />;
    }
  };

  return (
    <Drawer open={showExportSettings} anchor="left" onClose={toggleExportSettings}>
      <div className={`${classNames.panel} tour-exportTypePanel`}>
        <Tabs
          value={selectedTabIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          className="tour-exportTypePanelTabs"
        >
          <Tab label={i18n.settings} />
          <Tab label={i18n.preview} />
        </Tabs>
        <section>{getTab()}</section>
        <footer>
          <PrimaryButton onClick={toggleExportSettings} variant="outlined" color="primary" disableElevation>
            <HighlightOffIcon />
            {i18n.closePanel}
          </PrimaryButton>
        </footer>
      </div>
    </Drawer>
  );
};
