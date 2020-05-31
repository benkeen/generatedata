import React, { useState } from 'react';
import * as styles from './Header.scss';
import { GDLocale } from '../../../types/general';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckBox from '@material-ui/icons/Checkbox';
import Delete from '@material-ui/icons/Delete';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import SwapVert from '@material-ui/icons/SwapVert';
import { BuilderLayout } from '../builder/Builder.component';
import ClearGridDialog from '../dialogs/clearGrid/ClearGrid.component';
import { Tooltip } from '../../components/tooltips';
import { toSentenceCase } from '../../utils/stringUtils';

export type HeaderProps = {
	toggleGrid: () => void;
	togglePreview: () => void;
	toggleLayout: () => void;
	onClearGrid: () => void;
	isLoggedIn: boolean;
	onChangeLocale: Function;
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	locale: GDLocale;
	builderLayout: BuilderLayout;
	i18n: any;
}

const Header = ({
	isGridVisible, isPreviewVisible, toggleGrid, togglePreview, toggleLayout, i18n, builderLayout, onClearGrid
}: HeaderProps): JSX.Element => {
	const [showClearDialog, setShowClearDialog] = useState(false);
	const GridIcon = isGridVisible ? CheckBox : CheckBoxOutlineBlank;
	const PreviewIcon = isPreviewVisible ? CheckBox : CheckBoxOutlineBlank;
	const ToggleDirectionIcon = builderLayout === 'horizontal' ? SwapHoriz : SwapVert;
	const toggleLayoutEnabled = isGridVisible && isPreviewVisible;

	let toggleLayoutBtnClasses = styles.toggleLayoutBtn;
	if (!toggleLayoutEnabled) {
		toggleLayoutBtnClasses += ` ${styles.toggleLayoutBtnDisabled}`;
	}

	return (
		<>
			<header className={styles.header}>
				<div>
					<h1>
						<img src="./images/logo.png" width={295} height={58} />
					</h1>
					<nav>
						<ul>
						</ul>
						<ButtonGroup aria-label="" size="small" style={{ margin: '0 6px 0 12px', backgroundColor: '#ffffff' }}>
							<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.hideShowGrid }} />} arrow>
								<Button className={isGridVisible ? styles.btnSelected : ''} onClick={toggleGrid} startIcon={<GridIcon fontSize="small" />}>
									{i18n.grid}
								</Button>
							</Tooltip>
							<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.hideShowPreviewPanel }} />} arrow>
								<Button className={isPreviewVisible ? styles.btnSelected : ''} onClick={togglePreview} startIcon={<PreviewIcon />}>
									{i18n.preview}
								</Button>
							</Tooltip>
							<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.togglePanelLayout }} />}
								arrow
								disableHoverListener={!toggleLayoutEnabled}
								disableFocusListener={!toggleLayoutEnabled}>
								<span className={toggleLayoutBtnClasses}>
									<Button onClick={toggleLayout} disabled={!toggleLayoutEnabled}>
										<ToggleDirectionIcon />
									</Button>
								</span>
							</Tooltip>
							<Tooltip title={<span dangerouslySetInnerHTML={{ __html: toSentenceCase(i18n.clearPage) }} />} arrow>
								<Button onClick={(): void => setShowClearDialog(true)}>
									<Delete />
								</Button>
							</Tooltip>
						</ButtonGroup>
					</nav>
				</div>
			</header>
			<ClearGridDialog
				visible={showClearDialog}
				onClose={(): void => setShowClearDialog(false)}
				onClear={(): void => {
					onClearGrid();
					setShowClearDialog(false);
				}}
				i18n={i18n}
			/>
		</>
	);
};

export default Header;
