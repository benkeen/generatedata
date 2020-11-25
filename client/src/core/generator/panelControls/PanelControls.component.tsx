import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Delete from '@material-ui/icons/Delete';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import SwapVert from '@material-ui/icons/SwapVert';
import { toSentenceCase } from '~utils/stringUtils';
import { Tooltip } from '~components/tooltips';
import ClearGridDialog, { ClearType } from '../../dialogs/clearGrid/ClearGrid.component';
import { GeneratorLayout } from '../Generator.component';
import * as styles from './PanelControls.scss';

export type PanelControlsProps = {
	className: string;
	toggleGrid: () => void;
	togglePreview: () => void;
	toggleLayout: () => void;
	onClearGrid: (clearType: ClearType) => void;
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	generatorLayout: GeneratorLayout;
	i18n: any;
};

export const PanelControls = ({
	className, toggleGrid, togglePreview, toggleLayout, onClearGrid, isGridVisible, isPreviewVisible, generatorLayout, i18n
}: PanelControlsProps): JSX.Element => {
	const [showClearDialog, setShowClearDialog] = useState(false);

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
	const getToggleLayoutBtn = (): JSX.Element => {
		if (toggleLayoutEnabled) {
			return (
				<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.togglePanelLayout }}/>}
					 arrow
					 disableHoverListener={!toggleLayoutEnabled}
					 disableFocusListener={!toggleLayoutEnabled}>
					<Button onClick={toggleLayout} disabled={!toggleLayoutEnabled} className={styles.toggleLayoutBtn}>
						<ToggleDirectionIcon />
					</Button>
				</Tooltip>
			);
		}

		return (
			<Button onClick={toggleLayout} disabled={!toggleLayoutEnabled} className={`${styles.toggleLayoutBtn} ${styles.toggleLayoutBtnDisabled}`}>
				<ToggleDirectionIcon />
			</Button>
		);
	};

	return (
		<>
			<ButtonGroup aria-label="" size="small" className={`${className} ${styles.builderControls}`}>
				<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.hideShowGrid }} />} arrow>
					<Button className={gridBtnClasses} onClick={toggleGrid} startIcon={<GridIcon fontSize="small"/>}>
						{i18n.grid}
					</Button>
				</Tooltip>
				<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.hideShowPreviewPanel }} />} arrow>
					<Button className={previewBtnClasses} onClick={togglePreview} startIcon={<PreviewIcon/>}>
						{i18n.preview}
					</Button>
				</Tooltip>
				{getToggleLayoutBtn()}
				<Tooltip title={<span dangerouslySetInnerHTML={{ __html: toSentenceCase(i18n.clearPage) }} />} arrow>
					<Button onClick={(): void => setShowClearDialog(true)}>
						<Delete/>
					</Button>
				</Tooltip>
			</ButtonGroup>

			<ClearGridDialog
				visible={showClearDialog}
				onClose={(): void => setShowClearDialog(false)}
				onClear={(clearType): void => {
					onClearGrid(clearType);
					setShowClearDialog(false);
				}}
				i18n={i18n}
			/>
		</>
	);
};

export default PanelControls;
