import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Delete from '@mui/icons-material/Delete';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import SwapVert from '@mui/icons-material/SwapVert';
import CodeIcon from '@mui/icons-material/Code';
import { toSentenceCase } from '@generatedata/utils/string';
import { Tooltip } from '~components/tooltips';
import { GeneratorLayout } from '@generatedata/types';
import FeatureToggles from '~core/featureToggles';
import * as styles from './PanelControls.scss';

export type PanelControlsProps = {
	className: string;
	toggleGrid: () => void;
	togglePreview: () => void;
	toggleLayout: () => void;
	showClearPageDialog: () => void;
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	generatorLayout: GeneratorLayout;
	showDataTemplateDialog: () => void;
	i18n: any;
};

export const PanelControls = ({
	className,
	toggleGrid,
	togglePreview,
	toggleLayout,
	showClearPageDialog,
	isGridVisible,
	isPreviewVisible,
	generatorLayout,
	showDataTemplateDialog,
	i18n
}: PanelControlsProps) => {
	const toggleLayoutEnabled = isGridVisible && isPreviewVisible;
	const GridIcon = isGridVisible ? CheckBox : CheckBoxOutlineBlank;
	const PreviewIcon = isPreviewVisible ? CheckBox : CheckBoxOutlineBlank;
	const ToggleDirectionIcon = generatorLayout === 'horizontal' ? SwapHoriz : SwapVert;

	let gridBtnClasses = '';
	if (isGridVisible) {
		gridBtnClasses += ` ${styles.btnSelected}`;
	}

	let previewBtnClasses = '';
	if (isPreviewVisible) {
		previewBtnClasses += ` ${styles.btnSelected}`;
	}

	// Material UI throws an error when it comes to having a tooltip on a disabled button, and within a ButtonGroup
	// context it messes up the styles wrapping <Button> in a <span> like we do elsewhere. So this just constructs
	// the JSX differently for the enabled/disabled state
	const getToggleLayoutBtn = () => {
		if (toggleLayoutEnabled) {
			return (
				<Tooltip
					title={<span dangerouslySetInnerHTML={{ __html: i18n.togglePanelLayout }} />}
					arrow
					disableHoverListener={!toggleLayoutEnabled}
					disableFocusListener={!toggleLayoutEnabled}
				>
					<Button onClick={toggleLayout} disabled={!toggleLayoutEnabled} className={styles.toggleLayoutBtn}>
						<ToggleDirectionIcon />
					</Button>
				</Tooltip>
			);
		}

		return (
			<Button
				onClick={toggleLayout}
				disabled={!toggleLayoutEnabled}
				className={`${styles.toggleLayoutBtn} ${styles.toggleLayoutBtnDisabled}`}
			>
				<ToggleDirectionIcon />
			</Button>
		);
	};

	const getDataTemplateButton = () => {
		if (!FeatureToggles.DATA_TEMPLATE_GENERATION_UI) {
			return null;
		}

		return (
			<ButtonGroup aria-label="" size="small" className={`${className} ${styles.dataTemplateControls}`}>
				<Tooltip title={<span dangerouslySetInnerHTML={{ __html: 'Export / import template' }} />} placement="bottom" arrow>
					<Button onClick={showDataTemplateDialog} startIcon={<CodeIcon />} />
				</Tooltip>
			</ButtonGroup>
		);
	};

	return (
		<>
			<ButtonGroup aria-label="" size="small" className={`${className} ${styles.builderControls}`}>
				<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.hideShowGrid }} />} arrow>
					<Button className={gridBtnClasses} onClick={toggleGrid} startIcon={<GridIcon fontSize="small" />}>
						{i18n.grid}
					</Button>
				</Tooltip>
				<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.hideShowPreviewPanel }} />} arrow>
					<Button className={previewBtnClasses} onClick={togglePreview} startIcon={<PreviewIcon />}>
						{i18n.preview}
					</Button>
				</Tooltip>
				{getToggleLayoutBtn()}
				<Tooltip
					title={
						<span
							dangerouslySetInnerHTML={{
								__html: toSentenceCase(i18n.clearPage)
							}}
						/>
					}
					arrow
				>
					<Button onClick={showClearPageDialog}>
						<Delete />
					</Button>
				</Tooltip>
			</ButtonGroup>
			{getDataTemplateButton()}
		</>
	);
};

export default PanelControls;
