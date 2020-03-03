import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Refresh from '@material-ui/icons/Refresh';
import Settings from '@material-ui/icons/SettingsOutlined';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { BuilderLayout } from '../builder/Builder.component';
import * as styles from './PreviewPanel.scss';

export type PreviewPanelProps = {
	ExportTypePreview: any;
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	togglePreview: () => void;
	refreshPreview: () => void;
	toggleExportSettings: () => void;
	exportTypeSettings: any; // TODO
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: any;
	theme: string;
	previewTextSize: number;
	i18n: any;
};

const getThemeName = (theme: string): string => `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

const PreviewPanel = ({
	ExportTypePreview, i18n, theme, builderLayout, togglePreview, numPreviewRows, data, exportTypeSettings, showRowNumbers,
	enableLineWrapping, previewTextSize, refreshPreview, toggleExportSettings
}: PreviewPanelProps): React.ReactNode => {
	const getNoResults = (): JSX.Element | null => {
		if (data.rows.length > 0) {
			return null;
		}
		return (
			<div className={styles.noResults}>
				<ArrowDropUp style={{ fontSize: 300, position: 'absolute' }} />
				<div style={{ height: '100%', margin: 'auto' }}>
					<h1>{i18n.preview_panel_no_data}</h1>
					<p>{i18n.add_some_data_desc}</p>
				</div>
			</div>
		);
	};

	const themeName = getThemeName(theme);
	return (
		<div className={`${styles.previewPanel} ${themeName}`}>
			<div className={styles.controls}>
				<span onClick={toggleExportSettings}>
					<Tooltip title="Settings" placement="bottom">
						<IconButton size="small" aria-label="Settings">
							<Settings fontSize="large" />
						</IconButton>
					</Tooltip>
				</span>
				<span onClick={refreshPreview}>
					<Tooltip title={i18n.refreshPanel} placement="bottom">
						<IconButton size="small" aria-label={i18n.refreshPanel}>
							<Refresh fontSize="large" />
						</IconButton>
					</Tooltip>
				</span>
				<span onClick={togglePreview}>
					<Tooltip title={i18n.closePanel} placement="bottom">
						<IconButton size="small" aria-label={i18n.closePanel}>
							<CloseIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</span>
			</div>

			{getNoResults()}

			<div className={styles.preview} style={{
				fontSize: `${previewTextSize}px`,
				lineHeight: `${previewTextSize + 7}px`,
				border: '1px solid red'
			}}>
				<ExportTypePreview
					numPreviewRows={numPreviewRows}
					builderLayout={builderLayout}
					exportTypeSettings={exportTypeSettings}
					showRowNumbers={showRowNumbers}
					enableLineWrapping={enableLineWrapping}
					data={data}
					theme={theme}
				/>
			</div>
		</div>
	);
};

export default PreviewPanel;

