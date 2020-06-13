import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Refresh from '@material-ui/icons/Refresh';
import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { BuilderLayout } from '../builder/Builder.component';
import Portal from './PreviewPanelPortal.component';
import * as styles from './PreviewPanel.scss';
import { CSSProperties } from 'react';

const ExportTypeButton = withStyles({
	root: {
		borderColor: '#ffffff',
		color: '#ffffff',
		marginRight: 6,
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
			boxShadow: 'none'
		}
	}
})(Button);

export type PreviewPanelProps = {
	ExportTypePreview: any; // TODO
	numPreviewRows: number;
	builderLayout: BuilderLayout;
	togglePreview: () => void;
	refreshPreview: () => void;
	toggleExportSettings: () => void;
	exportTypeSettings: any; // TODO
	exportSettingsVisible: boolean;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	data: any;
	theme: string;
	previewTextSize: number;
	exportTypeLabel: string;
	i18n: any;
};

const getThemeName = (theme: string): string => `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

const PreviewPanel = ({
	ExportTypePreview, i18n, theme, builderLayout, togglePreview, numPreviewRows, data, exportTypeSettings, showRowNumbers,
	enableLineWrapping, previewTextSize, refreshPreview, toggleExportSettings, exportSettingsVisible, exportTypeLabel
}: PreviewPanelProps): React.ReactNode => {
	const getNoResults = (): JSX.Element | null => {
		if (data.rows.length > 0) {
			return null;
		}
		return (
			<div className={styles.noResults}>
				<div style={{ marginTop: -26 }}>
					<AddCircle style={{
						fontSize: 100,
						position: 'absolute',
						opacity: 0.1,
						top: 'calc(100% - 84px)',
						left: 'calc(100% - 125px)'
					}} />
					<div style={{ height: '100%', margin: 'auto' }}>
						<h1>{i18n.previewPanelNoData}</h1>
						<p>{i18n.addSomeDataDesc}</p>
					</div>
				</div>
			</div>
		);
	};

	let closeIconAction: any;
	let exportTypeLabelBtnAction: any;
	if (exportSettingsVisible) {
		closeIconAction = toggleExportSettings;
		exportTypeLabelBtnAction = (): void => {};
	} else {
		closeIconAction = togglePreview;
		exportTypeLabelBtnAction = toggleExportSettings;
	}

	const themeName = getThemeName(theme);
	const previewPanelStyles: CSSProperties = {
		fontSize: `${previewTextSize}px`,
		lineHeight: `${previewTextSize + 7}px`
	};

	let refreshTooltipProps = {};
	let refreshIconProps = {};
	if (data.rows.length === 0) {
		previewPanelStyles.flex = 0;
		refreshTooltipProps = { disableHoverListener: true };
		refreshIconProps = { disabled: true };
	}

	const getExportSettingsBtn = (): React.ReactNode => {
		if (exportSettingsVisible) {
			return <div />;
		}
		return (
			<ExportTypeButton
				disableElevation
				onClick={exportTypeLabelBtnAction}
				variant="outlined"
				color="primary"
				size="medium">
				{exportTypeLabel}
			</ExportTypeButton>
		);
	};

	const content = (
		<div className={styles.panelContent}>
			<div className={styles.topRow}>
				{getExportSettingsBtn()}

				<div className={styles.controls}>
					<span onClick={refreshPreview}>
						<Tooltip title={i18n.refreshPanel} placement="bottom" {...refreshTooltipProps}>
							<span>
								<IconButton size="small" aria-label={i18n.refreshPanel} {...refreshIconProps}>
									<Refresh fontSize="large" />
								</IconButton>
							</span>
						</Tooltip>
					</span>
					<span onClick={closeIconAction}>
						<Tooltip title={i18n.closePanel} placement="bottom">
							<span>
								<IconButton size="small" aria-label={i18n.closePanel}>
									<CloseIcon fontSize="large" />
								</IconButton>
							</span>
						</Tooltip>
					</span>
				</div>
			</div>

			{getNoResults()}

			<div className={styles.preview} style={previewPanelStyles}>
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

	if (exportSettingsVisible) {
		return (
			<Portal>
				<div className={`${styles.previewPanel} ${themeName}`}>{content}</div>
			</Portal>
		);
	}

	return (
		<div className={`${styles.previewPanel} ${themeName}`}>{content}</div>
	);
};

export default PreviewPanel;

