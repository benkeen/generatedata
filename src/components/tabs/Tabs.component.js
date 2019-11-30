import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { coreConfig } from '../../core';

export default function PrimaryTabs() {
	const [value, setValue] = React.useState(2);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = coreConfig.tabs.map((tab) => <Tab label={tab.label} key={tab.label} />);

	return (
			<Tabs
				value={value}
				indicatorColor="primary"
				textColor="primary"
				onChange={handleChange}
			>
				{tabs}
			</Tabs>
	);
}
