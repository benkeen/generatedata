import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Dropdown from '../dropdown/Dropdown';
import { getArrayOfSize } from '../../utils/arrayUtils';
import C from '../../core/constants';
import * as styles from './ExportSettings.scss';
import { ExportSettingsPosition } from '../../core/generator/generator.selectors';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import PreviewPanelSettingsContainer from '../exportSettings/ExportSettings.container';
// import HtmlTooltip from '../tooltip/HtmlTooltip';

export type ExportSettingsProps = {
	theme: string;
	numPreviewRows: number;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	previewTextSize: number;
	textSize: number;
	onChangeTheme: Function;
	toggleRowNumbers: Function;
	toggleLineWrapping: Function;
	onChangePreviewTextSize: Function;
	updateNumPreviewRows: Function;
	showExportSettings: boolean;
	exportSettingsPosition: ExportSettingsPosition
}

const options = getArrayOfSize(10).map((i, index) => ({ value: index + 1, label: index + 1 }));

export const ExportSettings = ({
	theme, previewTextSize, onChangeTheme, showRowNumbers, enableLineWrapping, toggleRowNumbers, toggleLineWrapping,
	onChangePreviewTextSize, numPreviewRows, updateNumPreviewRows, showExportSettings
}: ExportSettingsProps): React.ReactElement => {

	/*
				<Tabs
					value={value}
					indicatorColor="primary"
					textColor="primary"
					onChange={handleChange}
					aria-label="disabled tabs example"
				>
					<Tab label="Export Type" />
					<Tab label="Preview Panel" />
				</Tabs>
*/

	return (
		<Drawer open={showExportSettings} anchor="top" onClose={() => {}}>
			<Paper square style={{ backgroundColor: 'white', borderRadius: 4 }}>

				<div>
					Theme:
				<Dropdown
						value={theme}
						options={C.THEMES}
						onChange={({ value }: any): void => onChangeTheme(value)}
					/>
				</div>
				<div>
					Show line numbers
					<Switch
						checked={showRowNumbers}
						value="checked"
						color="default"
						onChange={(): void => toggleRowNumbers()}
					/>
				</div>
				<div>
					Line Wrapping
					<Switch
						checked={enableLineWrapping}
						value="checked"
						color="default"
						onChange={(): void => toggleLineWrapping()}
					/>
				</div>
				<div>
					Text size
					<input
						type="number"
						value={previewTextSize}
						style={{ width: 60 }}
						onChange={(e: any): void => onChangePreviewTextSize(parseInt(e.target.value, 10))}
					/>
				</div>
				<div>
					Preview rows:
					<Dropdown
						value={numPreviewRows}
						onChange={(item: any): any => updateNumPreviewRows(item.value)}
						options={options}
					/>
				</div>
			</Paper>
		</Drawer>
	);
};
