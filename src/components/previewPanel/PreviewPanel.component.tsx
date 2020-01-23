import * as React from 'react';
import loadable from '@loadable/component';
import Dropdown from '../dropdown/Dropdown';
import CloseIcon from '@material-ui/icons/Close';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import SwapVert from '@material-ui/icons/SwapVert';
import Refresh from '@material-ui/icons/Refresh';
import Settings from '@material-ui/icons/SettingsOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PreviewPanelSettingsContainer from './PreviewPanelSettings.container';
import { getArrayOfSize } from '../../utils/arrayUtils';
import HtmlTooltip from '../tooltip/HtmlTooltip';
import * as styles from './PreviewPanel.scss';
import { BuilderLayout } from '../builder/Builder.component';

export type PreviewPanelProps = {
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	togglePreview: () => void;
	toggleLayout: () => void;
	updateNumPreviewRows: (numRows: number) => void;
	exportTypeSettings: any; // TODO
	showRowNumbers: boolean;
	data: any;
	theme: string;
	previewTextSize: number;
};

const options = getArrayOfSize(10).map((i, index) => ({ value: index + 1, label: index + 1 }));
const getThemeName = (theme: string): string => `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

const PreviewPanel = ({
	theme, builderLayout, togglePreview, toggleLayout, numPreviewRows, updateNumPreviewRows, data,
	exportTypeSettings, showRowNumbers, previewTextSize
}: PreviewPanelProps): React.ReactNode => {
	const [previewSettingsVisible, setPreviewSettingsVisibility] = React.useState(false);
	const ToggleDirectionIcon = builderLayout === 'horizontal' ? SwapHoriz : SwapVert;

	// TODO delay https://stackoverflow.com/questions/54158994/react-suspense-lazy-delay - drop the fallback altogether
	// so we can fade the spinner out when the content is loaded
	const ExportTypePreview = loadable(() => import(
		/* webpackChunkName: "exportType-[index]" */
		'../../plugins/exportTypes/JSON/JSONPreview.container')
	);

	console.log('...', previewTextSize);

	const themeName = getThemeName(theme);
	return (
		<div className={`${styles.previewPanel} ${themeName}`}>
			<div className={styles.topRow}>
				<span style={{ display: 'flex', flexDirection: 'row' }}>
					<span style={{ display: 'flex', alignItems: 'center' }}>
						Preview rows: 
						<Dropdown
							value={numPreviewRows}
							onChange={(item: any): any => updateNumPreviewRows(item.value)}
							options={options}
						/>
					</span>
				</span>
				<span>
					<span>
						<ClickAwayListener onClickAway={(e): void => {
							// TODO see if there's a more idiomatic way to do this with Material UI
							// @ts-ignore
							if (!e.target.closest('.previewPanelSettings')) {
								setPreviewSettingsVisibility(false);
							}
						}}>
							<HtmlTooltip
								arrow
								open={previewSettingsVisible}
								placement="left"
								disableFocusListener
								disableTouchListener
								interactive
								title={<PreviewPanelSettingsContainer />}
							>
								<IconButton size="small" aria-label="Settings" onClick={(): void=> setPreviewSettingsVisibility(true)}>
									<Settings fontSize="large" />
								</IconButton>
							</HtmlTooltip>
						</ClickAwayListener>
					</span>
					<span onClick={(): any => { }}>
						<Tooltip title="Refresh panel" placement="bottom">
							<IconButton size="small" aria-label="Refresh">
								<Refresh fontSize="large" />
							</IconButton>
						</Tooltip>
					</span>
					<span onClick={toggleLayout}>
						<Tooltip title="Toggle grid/preview panel layout" placement="bottom">
							<IconButton size="small" aria-label="Toggle layout">
								<ToggleDirectionIcon fontSize="large" />
							</IconButton>
						</Tooltip>
					</span>
					<span className={styles.closePanel} onClick={togglePreview}>
						<Tooltip title="Close panel" placement="bottom">
							<IconButton size="small" aria-label="Close panel">
								<CloseIcon fontSize="large" />
							</IconButton>
						</Tooltip>
					</span>
				</span>
			</div>

			<div className={styles.preview} style={{ fontSize: `${previewTextSize}px` }}>
				<React.Suspense fallback={<div>loading...</div>}>
					<ExportTypePreview
						numPreviewRows={numPreviewRows}
						builderLayout={builderLayout}
						exportTypeSettings={exportTypeSettings}
						showRowNumbers={showRowNumbers}
						data={data}
						theme={theme}
					/>
				</React.Suspense>
			</div>
		</div>
	);
};

export default PreviewPanel;

