import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PreviewSettings from './PreviewSettings.container';

export type ExportSettingsProps = {
	showExportSettings: boolean;
	toggleExportSettings: any;
}

export const ExportSettings = ({ showExportSettings, toggleExportSettings }: ExportSettingsProps): React.ReactElement => {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
	const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => setSelectedTabIndex(newValue);
	const getTab = () => {
		if (selectedTabIndex === 0) {
			return null;
		} else {
			return <PreviewSettings />;
		}
	};

	return (
		<Drawer open={showExportSettings} anchor="top" onClose={toggleExportSettings}>
			<Tabs
				value={selectedTabIndex}
				indicatorColor="primary"
				textColor="primary"
				onChange={handleChange}
				aria-label="disabled tabs example"
			>
				<Tab label="Export Type" />
				<Tab label="Preview Panel" />
			</Tabs>
			{getTab()}
		</Drawer>
	);
};
