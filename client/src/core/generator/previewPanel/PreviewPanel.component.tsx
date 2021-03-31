import React, { useEffect, CSSProperties } from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import ErrorSolidIcon from '@material-ui/icons/Error';
import Refresh from '@material-ui/icons/Refresh';
import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import CodeMirrorWrapper from './CodeMirrorWrapper.container';
import { Tooltip } from '~components/tooltips';
import Portal from '~components/Portal';
import { PreviewPanelLoader } from './PreviewPanelLoader.component';
import C from '../../constants';
import * as styles from './PreviewPanel.scss';

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
	togglePreview: () => void;
	refreshPreview: () => void;
	changeSmallScreenVisiblePanel: () => void;
	exportTypeLoaded: boolean;
	toggleExportSettings: () => void;
	closeOverlayPanels: () => void;
	exportSettingsVisible: boolean;
	dataSetHistoryVisible: boolean;
	hasData: boolean;
	theme: string;
	previewTextSize: number;
	exportTypeLabel: string;
	i18n: any;
	hasValidExportTypeSettings: boolean;
	hasBulkActionPending: boolean;
	initialDependenciesLoaded: boolean; // set once on load
	previewPanelDependenciesLoaded: boolean; // set every time a user selects
	initRefresh: any;
};

const getThemeName = (theme: string): string => `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

const NoResultsBlock = ({ i18n, type }: any): JSX.Element => {
	const map: any = {
		invalidSettings: {
			icon: ErrorSolidIcon,
			title: i18n.invalidSettings,
			label: i18n.editExportTypeSettings
		},
		noData: {
			icon: AddCircle,
			title: i18n.previewPanelNoData,
			label: i18n.addSomeDataDesc
		}
	};

	const Icon = map[type].icon;

	return (
		<div className={styles.noResults}>
			<div style={{ marginTop: -50 }}>
				<Icon style={{
					fontSize: 100,
					position: 'absolute',
					opacity: 0.1,
					top: 'calc(50% - 76px)',
					left: 'calc(50% - 50px)'
				}} />
				<div style={{ height: '100%', margin: 'auto' }}>
					<h1>{map[type].title}</h1>
					<p>{map[type].label}</p>
				</div>
			</div>
		</div>
	);
};

const PreviewPanel = ({
	i18n, theme, togglePreview, hasData, previewTextSize, refreshPreview, toggleExportSettings, exportSettingsVisible,
	dataSetHistoryVisible, exportTypeLabel, changeSmallScreenVisiblePanel, exportTypeLoaded, initialDependenciesLoaded,
	hasValidExportTypeSettings, hasBulkActionPending, previewPanelDependenciesLoaded, initRefresh, closeOverlayPanels
}: PreviewPanelProps): React.ReactNode => {
	const windowSize = useWindowSize();

	// on load, and after a user loads a data set, rather than retrigger a refresh of the preview panel after every little
	// change, we do it ONCE when all data types, the export type and locale file have been loaded
	useEffect(() => {
		if (!hasBulkActionPending) {
			return;
		}

		if (previewPanelDependenciesLoaded) {
			initRefresh();
		}

	}, [hasBulkActionPending, previewPanelDependenciesLoaded]);

	const getNoResults = (): JSX.Element | null => {
		if (!hasValidExportTypeSettings) {
			return (
				<NoResultsBlock i18n={i18n} type="invalidSettings" />
			);
		}

		if (hasData) {
			return null;
		}

		return (
			<NoResultsBlock i18n={i18n} type="noData" />
		);
	};

	let closeIconAction: any;
	let exportTypeLabelBtnAction: any;
	if (exportSettingsVisible || dataSetHistoryVisible) {
		closeIconAction = closeOverlayPanels;
		exportTypeLabelBtnAction = (): void => {};
	} else {
		if (windowSize.width < C.SMALL_SCREEN_WIDTH) {
			closeIconAction = changeSmallScreenVisiblePanel;
		} else {
			closeIconAction = togglePreview;
		}
		exportTypeLabelBtnAction = toggleExportSettings;
	}

	const themeName = getThemeName(theme);
	const previewPanelStyles: CSSProperties = {
		fontSize: `${previewTextSize}px`,
		lineHeight: `${previewTextSize + 7}px`
	};

	let refreshTooltipProps = {};
	let refreshIconProps = {};
	if (!hasData || !hasValidExportTypeSettings) {
		previewPanelStyles.flex = 0;
		refreshTooltipProps = { disableHoverListener: true };
		refreshIconProps = { disabled: true };
	}

	let exportTypeButtonClasses = 'tour-exportTypeBtn';
	if (!hasValidExportTypeSettings) {
		exportTypeButtonClasses += ` ${styles.error}`;
	}

	const getExportSettingsBtn = (): React.ReactNode => {
		if (exportSettingsVisible) {
			return <div />;
		}

		if (dataSetHistoryVisible) {
			return (
				<div>
					<Button
						disableElevation
						onClick={exportTypeLabelBtnAction}
						variant="outlined"
						color="primary"
						size="medium"
						className={styles.dataSetHistoryBtnClass}
						style={{ marginRight: 10 }}>
						{i18n.grid}
					</Button>
					<Button
						disableElevation
						onClick={exportTypeLabelBtnAction}
						variant="outlined"
						color="primary"
						className={styles.dataSetHistoryBtnClass}
						size="medium">
						{i18n.preview}
					</Button>
				</div>
			);
		}

		return (
			<ExportTypeButton
				disableElevation
				onClick={exportTypeLabelBtnAction}
				variant="outlined"
				color="primary"
				size="medium"
				className={exportTypeButtonClasses}>
				{exportTypeLabel}
				{!hasValidExportTypeSettings ? <ErrorIcon /> : null}
			</ExportTypeButton>
		);
	};

	const getCodeMirrorPanel = (): React.ReactNode => {
		if (!hasValidExportTypeSettings || !hasData) {
			return null;
		}

		if (!exportTypeLoaded) {
			return <PreviewPanelLoader />;
		}

		return (
			<CodeMirrorWrapper />
		);
	};

	if (!initialDependenciesLoaded) {
		return (
			<div className={`${styles.previewPanel} ${themeName}`}>
				<div className={styles.previewLoading}>
					<PreviewPanelLoader />
				</div>
			</div>
		);
	}

	const content = (
		<div className={styles.panelContent}>
			<div className={styles.topRow}>
				{getExportSettingsBtn()}

				<div className={`${styles.controls} tour-previewPanelControls`}>
					<span onClick={refreshPreview}>
						<Tooltip title={i18n.refreshPanel} placement="bottom" {...refreshTooltipProps} arrow>
							<span>
								<IconButton size="small" aria-label={i18n.refreshPanel} {...refreshIconProps}>
									<Refresh fontSize="large" />
								</IconButton>
							</span>
						</Tooltip>
					</span>
					<span onClick={closeIconAction}>
						<Tooltip title={i18n.closePanel} placement="bottom" arrow>
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
				{getCodeMirrorPanel()}
			</div>
		</div>
	);

	if (exportSettingsVisible || dataSetHistoryVisible) {
		return (
			<Portal id="previewPanelFullScreen">
				<div className={`${styles.previewPanel} ${themeName}`}>{content}</div>
			</Portal>
		);
	}

	return (
		<div className={`${styles.previewPanel} ${themeName}`}>{content}</div>
	);
};

export default PreviewPanel;

