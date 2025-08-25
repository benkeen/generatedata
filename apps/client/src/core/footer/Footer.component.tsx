import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SaveIcon from '@mui/icons-material/Save';
import GearIcon from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/EmojiPeople';
import { Tooltip } from '~components/tooltips';
import { Github } from '~components/icons';
import ActivePacketsList from '../generationPanel/ActivePacketsList.container';
import PanelControls from '../generator/panelControls/PanelControls.container';
import AboutDialog from '~core/dialogs/about/About.component';
import useOnClickOutside from 'use-onclickoutside';
import styles from './Footer.scss';
import { useWindowSize } from 'react-hooks-window-size';
import C from '@generatedata/config/constants';
import { isGeneratorPage } from '~utils/routeUtils';
import { GDLocale } from '~types/general';
import { useNavigate } from 'react-router';

export type FooterProps = {
	i18n: any;
	locale: GDLocale;
	scriptVersion: string;
	onGenerate: () => void;
	onSave: () => void;
	onSaveNewDataSet: () => void;
	onSaveAs: () => void;
	actionButtonsEnabled: boolean;
	currentPage: string; // isGeneratorPage?
	currentDataSetId: number | null;
	showTourDialog: (navigate: any) => void;
	customFooterLinks: JSX.Element[];
};

const Footer = ({
	i18n,
	locale,
	actionButtonsEnabled,
	scriptVersion,
	onSave,
	onGenerate,
	currentPage,
	currentDataSetId,
	onSaveNewDataSet,
	onSaveAs,
	showTourDialog,
	customFooterLinks
}: FooterProps) => {
	const navigate = useNavigate();
	const saveAsButtonRef = React.useRef(null);
	const anchorRef = React.useRef<HTMLDivElement>(null);
	const [saveAsMenuOpen, setSaveAsMenuOpen] = useState(false);
	const [showAboutDialog, setAboutDialogVisibility] = useState(false);

	const windowSize = useWindowSize();

	useOnClickOutside(saveAsButtonRef, () => {
		setSaveAsMenuOpen(false);
	});

	// we always show the login button. It'll show a "you must login in" dialog if they're not logged in/registered
	const getSaveButton = () => {
		// if the data set has already been saved, we give them a split button: the main button immediately saves,
		// the arrow gives them the option to create a new data set via the "Save as" option
		if (currentDataSetId) {
			return (
				<div ref={saveAsButtonRef} style={{ position: 'relative' }}>
					<ButtonGroup
						variant="contained"
						color="primary"
						className={`${styles.saveButtonAs} tour-saveButton`}
						ref={anchorRef}
						disableElevation
						aria-label="split button"
						disabled={!actionButtonsEnabled}
					>
						<Button onClick={onSave} className={styles.saveButtonAsMainBtn}>
							<SaveIcon />
							{i18n.save}
						</Button>
						<Button
							color="primary"
							size="small"
							aria-controls={saveAsMenuOpen ? 'split-button-menu' : undefined}
							aria-expanded={saveAsMenuOpen ? 'true' : undefined}
							aria-label={i18n.saveDataSetNewName}
							aria-haspopup="menu"
							className={styles.saveBtnArrow}
							onClick={(): void => setSaveAsMenuOpen(!saveAsMenuOpen)}
						>
							<ArrowDropDownIcon />
						</Button>
					</ButtonGroup>

					<Popper
						open={saveAsMenuOpen}
						anchorEl={anchorRef.current}
						transition
						placement="top-end"
						className={styles.saveAsRow}
						onClick={(e): void => {
							e.preventDefault();
							e.stopPropagation();
							onSaveAs();
						}}
					>
						{({ TransitionProps }): any => (
							<Grow {...TransitionProps}>
								<div>{i18n.saveAs}</div>
							</Grow>
						)}
					</Popper>
				</div>
			);
		}

		return (
			<Button
				onClick={onSaveNewDataSet}
				className={`${styles.saveButton} tour-saveButton`}
				variant="contained"
				disableElevation
				disabled={!actionButtonsEnabled}
			>
				<SaveIcon />
				{i18n.save}
			</Button>
		);
	};

	let footerControlsClasses = styles.footerControls;
	if (isGeneratorPage(currentPage, locale)) {
		footerControlsClasses += ` ${styles.visible}`;
	}

	let panelControls;
	if (windowSize.width > C.SMALL_SCREEN_WIDTH) {
		panelControls = <PanelControls className={`${styles.controls} tour-panelControls`} />;
	}

	return (
		<>
			<footer className={styles.footer}>
				<div>
					<ul>
						<li className={styles.aboutIconEl}>
							<Tooltip title={i18n.aboutThisScript} arrow>
								<span onClick={(): void => setAboutDialogVisibility(true)}>
									<Github />
								</span>
							</Tooltip>
						</li>
						<li className={styles.showTourLink}>
							<Button className={styles.tourBtn} onClick={() => showTourDialog(navigate)}>
								<Person />
								<span>{i18n.help}</span>
							</Button>
						</li>
						{customFooterLinks}
					</ul>

					<div className={styles.activePacketsList}>
						<ActivePacketsList />
					</div>

					<div className={footerControlsClasses}>
						{panelControls}
						{getSaveButton()}
						<Button
							onClick={onGenerate}
							className={`${styles.generateButton} tour-generateButton`}
							variant="contained"
							color="primary"
							disableElevation
							disabled={!actionButtonsEnabled}
						>
							<GearIcon />
							{i18n.generate}
						</Button>
					</div>
				</div>
			</footer>
			<AboutDialog
				visible={showAboutDialog}
				onClose={(): void => setAboutDialogVisibility(false)}
				scriptVersion={scriptVersion}
				i18n={i18n}
			/>
		</>
	);
};

export default Footer;
