import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SaveIcon from '@material-ui/icons/Save';
import GearIcon from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/EmojiPeople';
import { Tooltip } from '~components/tooltips';
import { Github } from '~components/icons';
import ActivePacketsList from '../generationPanel/ActivePacketsList.container';
import PanelControls from '../generator/panelControls/PanelControls.container';
import AboutDialog from '~core/dialogs/about/About.component';
import useOnClickOutside from 'use-onclickoutside';
import styles from './Footer.scss';
import { useWindowSize } from 'react-hooks-window-size';
import C from '~core/constants';
import { getGeneratorRoute } from '~utils/routeUtils';
import { GDLocale } from '~types/general';

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
	showTourDialog: (history: any) => void;
	customFooterLinks: JSX.Element[];
};

const Footer = ({
	i18n, locale, actionButtonsEnabled, scriptVersion, onSave, onGenerate, currentPage,
	currentDataSetId, onSaveNewDataSet, onSaveAs, showTourDialog, customFooterLinks
}: FooterProps): JSX.Element => {
	const saveAsButtonRef = React.useRef(null);
	const anchorRef = React.useRef<HTMLDivElement>(null);
	const [saveAsMenuOpen, setSaveAsMenuOpen] = useState(false);
	const [showAboutDialog, setAboutDialogVisibility] = useState(false);

	const windowSize = useWindowSize();

	useOnClickOutside(saveAsButtonRef, () => {
		setSaveAsMenuOpen(false);
	});

	// we always show the login button. It'll show a "you must login in" dialog if they're not logged in/registered
	const getSaveButton = (): JSX.Element | null => {

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
						disabled={!actionButtonsEnabled}>
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
						}}>
						{({ TransitionProps }): any => (
							<Grow {...TransitionProps}>
								<div>
									{i18n.saveAs}
								</div>
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
				disabled={!actionButtonsEnabled}>
				<SaveIcon />
				{i18n.save}
			</Button>
		);
	};

	let footerControlsClasses = styles.footerControls;
	if (getGeneratorRoute(locale) === currentPage) {
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
							<Button className={styles.tourBtn} onClick={showTourDialog}>
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
