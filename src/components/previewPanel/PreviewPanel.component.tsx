import * as React from 'react';
import loadable from '@loadable/component';
import CloseIcon from '@material-ui/icons/Close';
import Refresh from '@material-ui/icons/Refresh';
import Settings from '@material-ui/icons/SettingsOutlined';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PreviewPanelSettingsContainer from './PreviewPanelSettings.container';
import HtmlTooltip from '../tooltip/HtmlTooltip';
import * as styles from './PreviewPanel.scss';
import { BuilderLayout } from '../builder/Builder.component';

export type PreviewPanelProps = {
	i18n: any;
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	togglePreview: () => void;
	exportTypeSettings: any; // TODO
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: any;
	theme: string;
	previewTextSize: number;
};

const getThemeName = (theme: string): string => `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

const PreviewPanel = ({
	i18n, theme, builderLayout, togglePreview, numPreviewRows, data, exportTypeSettings, showRowNumbers, enableLineWrapping, 
	previewTextSize, refreshPreview
}: PreviewPanelProps): React.ReactNode => {
	const [previewSettingsVisible, setPreviewSettingsVisibility] = React.useState(false);

	// TODO delay https://stackoverflow.com/questions/54158994/react-suspense-lazy-delay - drop the fallback altogether
	// so we can fade the spinner out when the content is loaded
	const ExportTypePreview = loadable(() => import(
		/* webpackChunkName: "exportType-[index]" */
		'../../plugins/exportTypes/JSON/JSONPreview.component')
	);
 
	const getNoResults = (): JSX.Element | null => {
		if (data.rows.length > 0) {
			return null;
		}

		return (
			<div className={styles.noResults}>
				<ArrowDropUp style={{ fontSize: 300, position: 'absolute' }} />
				<div style={{ height: '100%', margin: 'auto' }}>
					<h1>Nothing to show!</h1>
					<p>Add some rows in the Grid panel above</p>
				</div>
			</div>
		);
	};

	const themeName = getThemeName(theme);
	return (
		<div className={`${styles.previewPanel} ${themeName}`}>
			<div className={styles.controls}>
				<span>
					<ClickAwayListener onClickAway={(e): void => {
						// TODO see if there's a more idiomatic way to do this with Material UI
						// @ts-ignore
						if (!e.target.closest(`.${styles.previewPanelSettings}`)) {
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
				<span onClick={refreshPreview}>
					<Tooltip title="Refresh panel" placement="bottom">
						<IconButton size="small" aria-label="Refresh">
							<Refresh fontSize="large" />
						</IconButton>
					</Tooltip>
				</span>
				<span onClick={togglePreview}>
					<Tooltip title="Close panel" placement="bottom">
						<IconButton size="small" aria-label="Close panel">
							<CloseIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</span>
			</div>

			{getNoResults()}

			<div className={styles.preview} style={{
				fontSize: `${previewTextSize}px`,
				lineHeight: `${previewTextSize + 7}px`
			}}>
				<React.Suspense fallback={<div>loading...</div>}>
					<ExportTypePreview
						numPreviewRows={numPreviewRows}
						builderLayout={builderLayout}
						exportTypeSettings={exportTypeSettings}
						showRowNumbers={showRowNumbers}
						enableLineWrapping={enableLineWrapping}
						data={data}
						theme={theme}
					/>
				</React.Suspense>
			</div>
		</div>
	);
};

export default PreviewPanel;

