import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { config } from '../../../config.defaults';

export default function DisabledTabs() {
	const [value, setValue] = React.useState(2);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = config.tabs.map((tab) => <Tab label={tab.label} />);

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
