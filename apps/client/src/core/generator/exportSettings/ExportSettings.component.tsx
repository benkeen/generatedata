import * as React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PreviewSettingsTab from './PreviewSettingsTab.container';
import ExportTypeTab from './ExportTypeTab.container';
import * as styles from './ExportSettings.scss';

export type ExportSettingsProps = {
	i18n: any;
	showExportSettings: boolean;
	toggleExportSettings: any;
};

export const ExportSettings = ({
	i18n,
	showExportSettings,
	toggleExportSettings
}: ExportSettingsProps): React.ReactElement => {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
	const handleChange = (e: React.ChangeEvent<{}>, newValue: number): void => setSelectedTabIndex(newValue);
	const getTab = (): JSX.Element | null => {
		if (selectedTabIndex === 0) {
			return <ExportTypeTab />;
		} else {
			return <PreviewSettingsTab />;
		}
	};

	return (
		<Drawer open={showExportSettings} anchor="left" onClose={toggleExportSettings}>
			<div className={`${styles.panel} tour-exportTypePanel`}>
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
					<Button onClick={toggleExportSettings} variant="outlined" color="primary" disableElevation>
						<HighlightOffIcon />
						{i18n.closePanel}
					</Button>
				</footer>
			</div>
		</Drawer>
	);
};
