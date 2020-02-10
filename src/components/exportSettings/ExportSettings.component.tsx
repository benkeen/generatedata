import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PreviewSettingsTab from './PreviewSettingsTab.container';
import ExportTypeTab from './ExportTypeTab.container';
import { BuilderLayout } from '../builder/Builder.component';

export type ExportSettingsProps = {
	builderLayout: BuilderLayout;
	showExportSettings: boolean;
	toggleExportSettings: any;
}

export const ExportSettings = ({ builderLayout, showExportSettings, toggleExportSettings }: ExportSettingsProps): React.ReactElement => {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
	const handleChange = (e: React.ChangeEvent<{}>, newValue: number): void => setSelectedTabIndex(newValue);
	const getTab = (): JSX.Element | null => {
		if (selectedTabIndex === 0) {
			return <ExportTypeTab />;
		} else {
			return <PreviewSettingsTab />;
		}
	};

	const anchor = builderLayout === 'horizontal' ? 'top' : 'left';
	return (
		<Drawer open={showExportSettings} anchor={anchor} onClose={toggleExportSettings}>
			<Tabs
				value={selectedTabIndex}
				indicatorColor="primary"
				textColor="primary"
				onChange={handleChange}
			>
				<Tab label="Export Type" />
				<Tab label="Preview Panel" />
			</Tabs>
			{getTab()}
		</Drawer>
	);
};
