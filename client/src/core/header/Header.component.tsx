import React, { useState } from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBox from '@material-ui/icons/CheckBox';
import Delete from '@material-ui/icons/Delete';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import SwapVert from '@material-ui/icons/SwapVert';
import MenuIcon from '@material-ui/icons/Menu';
import { BuilderLayout } from '../builder/Builder.component';
import ClearGridDialog, { ClearType } from '../dialogs/clearGrid/ClearGrid.component';
import { Tooltip } from '~components/tooltips';
import { toSentenceCase } from '~utils/stringUtils';
import IntroDialog from '../dialogs/intro/Intro.component';
import { GDLocale } from '~types/general';
import C from '../constants';
import * as styles from './Header.scss';
import { GeneratorPanel } from '../store/generator/generator.reducer';

export type HeaderProps = {
	toggleGrid: () => void;
	togglePreview: () => void;
	toggleLayout: () => void;
	onClearGrid: (clearType: ClearType) => void;
	toggleIntroDialog: () => void;
	onChangeSmallScreenVisiblePanel: () => void;
	isLoggedIn: boolean;
	onChangeLocale: Function;
	isGridVisible: boolean;
	isPreviewVisible: boolean;
	smallScreenVisiblePanel: GeneratorPanel;
	showIntroDialog: boolean;
	locale: GDLocale;
	builderLayout: BuilderLayout;
	i18n: any;
};

const Header = ({
	isGridVisible, isPreviewVisible, smallScreenVisiblePanel, toggleGrid, togglePreview, toggleLayout, i18n,
	builderLayout, onClearGrid, toggleIntroDialog, showIntroDialog, onChangeSmallScreenVisiblePanel
}: HeaderProps): JSX.Element => {
	const [showClearDialog, setShowClearDialog] = useState(false);
	const GridIcon = isGridVisible ? CheckBox : CheckBoxOutlineBlank;
	const PreviewIcon = isPreviewVisible ? CheckBox : CheckBoxOutlineBlank;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const ToggleDirectionIcon = builderLayout === 'horizontal' ? SwapHoriz : SwapVert;
	const windowSize = useWindowSize();
	const toggleLayoutEnabled = isGridVisible && isPreviewVisible;

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
	};

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

	let gridBtnClasses = '';
	if (isGridVisible) {
		gridBtnClasses += ` ${styles.btnSelected}`;
	}

	let previewBtnClasses = '';
	if (isPreviewVisible) {
		previewBtnClasses += ` ${styles.btnSelected}`;
	}

	const getNav = (): React.ReactNode => {
		if (windowSize.width <= C.SMALL_SCREEN_WIDTH) {
			const togglePanelLabel = smallScreenVisiblePanel === 'grid' ? i18n.showPreview : i18n.showGrid;
			return (
				<>
					<Button aria-controls="nav-menu" aria-haspopup="true" onClick={handleClick}>
						<MenuIcon fontSize="large" />
					</Button>
					<Menu
						id="nav-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={((): void => {
							handleClose();
							setShowClearDialog(true);
						})}>Clear grid</MenuItem>
						<MenuItem onClick={(): void => {
							handleClose();
							onChangeSmallScreenVisiblePanel();
						}}>{togglePanelLabel}</MenuItem>
					</Menu>
				</>
			);
		}

		return (
			<>
				<ul>
				</ul>
				<ButtonGroup aria-label="" size="small" className={styles.items}>
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
					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: toSentenceCase(i18n.clearPage) }} />} arrow>
						<Button onClick={(): void => setShowClearDialog(true)}>
							<Delete />
						</Button>
					</Tooltip>
				</ButtonGroup>
			</>
		);
	};

	return (
		<>
			<header className={styles.header}>
				<div>
					<h1>
						<img
							src="./images/logo.png"
							width={295}
							height={58}
							onClick={toggleIntroDialog}
						/>
					</h1>
					<nav>
						{getNav()}
					</nav>
				</div>
			</header>
			<ClearGridDialog
				visible={showClearDialog}
				onClose={(): void => setShowClearDialog(false)}
				onClear={(clearType): void => {
					onClearGrid(clearType);
					setShowClearDialog(false);
				}}
				i18n={i18n}
			/>
			<IntroDialog
				visible={showIntroDialog}
				onClose={toggleIntroDialog}
				i18n={i18n}
			/>
		</>
	);
};

export default Header;
