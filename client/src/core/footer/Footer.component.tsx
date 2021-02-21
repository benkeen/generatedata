import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SaveIcon from '@material-ui/icons/Save';
import GearIcon from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/EmojiPeople';
import { HtmlTooltip, Tooltip } from '~components/tooltips';
import styles from './Footer.scss';
import sharedStyles from '../../styles/shared.scss';
import { Github } from '~components/icons';
import ActivePacketsList from '../generationPanel/ActivePacketsList.container';
import PanelControls from '../generator/panelControls/PanelControls.container';
import AboutDialog from '~core/dialogs/about/About.component';
import { GDLocale } from '~types/general';
import useOnClickOutside from 'use-onclickoutside';

export type FooterProps = {
	locale: GDLocale;
	i18n: any;
	scriptVersion: string;
	onChangeLocale: (a: any) => void;
	onGenerate: () => void;
	onSave: () => void;
	onSaveNewDataSet: () => void;
	onSaveAs: () => void;
	actionButtonsEnabled: boolean;
	currentPage: string;
	currentDataSetId: number | null;
	availableLocales: GDLocale[];
	showTourDialog: (history: any) => void;
	customFooterLinks: JSX.Element[];
};

// TODO move
const allLocaleOptions = [
	{ value: 'ar', label: 'عربى' },
	{ value: 'de', label: 'Deutsch' },
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Español' },
	{ value: 'fr', label: 'Français' },
	{ value: 'nl', label: 'Nederlands' },
	{ value: 'ja', label: '日本人' },
	{ value: 'ta', label: 'தமிழ்' },
	{ value: 'zh', label: '中文' }
];

const useListStyles = makeStyles(() =>
	createStyles({
		root: {
			width: 130
		}
	})
);

const Footer = ({
	i18n, locale, actionButtonsEnabled, onChangeLocale, scriptVersion, onSave, onGenerate, currentPage, availableLocales,
	currentDataSetId, onSaveNewDataSet, onSaveAs, showTourDialog, customFooterLinks
}: FooterProps): JSX.Element => {
	const popoverRef = React.useRef(null);
	const saveAsButtonRef = React.useRef(null);
	const anchorRef = React.useRef<HTMLDivElement>(null);
	const [saveAsMenuOpen, setSaveAsMenuOpen] = useState(false);
	const [showAboutDialog, setAboutDialogVisibility] = useState(false);

	const [localeTooltipVisible, setLocaleTooltipVisibility] = React.useState(false);
	const listClasses = useListStyles();

	useOnClickOutside(popoverRef, () => {
		setLocaleTooltipVisibility(false);
	});

	useOnClickOutside(saveAsButtonRef, () => {
		setSaveAsMenuOpen(false);
	});

	const getLocaleSelector = (): JSX.Element | null => {
		if (availableLocales.length < 1) {
			return null;
		}

		return (
			<li className={styles.langIconEl}>
				<HtmlTooltip
					arrow
					open={localeTooltipVisible}
					placement="top"
					disableFocusListener
					disableHoverListener
					disableTouchListener
					interactive
					title={
						<div className={listClasses.root} ref={popoverRef}>
							<List disablePadding>
								{allLocaleOptions.map((currLocale: any): JSX.Element => (
									<ListItem
										button
										key={currLocale.value}
										className={locale === currLocale.value ? styles.selectedLocale : ''}
										onClick={(): void => onChangeLocale(currLocale.value)}>
										<ListItemText primary={currLocale.label} />
									</ListItem>
								))}
							</List>
						</div>
					}
				>
					<LanguageIcon fontSize="large" onClick={(): void => setLocaleTooltipVisibility(true)} />
				</HtmlTooltip>
			</li>
		);
	};

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
							aria-label="Save data set as new name"
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

	let generatorControlsClasses = sharedStyles.generatorControls;
	if (currentPage === process.env.GD_GENERATOR_PATH) {
		generatorControlsClasses += ` ${sharedStyles.visible}`;
	}

	return (
		<>
			<footer className={styles.footer}>
				<div>
					<ul>
						<li className={styles.aboutIconEl}>
							<Tooltip title="About this script" arrow>
								<span onClick={(): void => setAboutDialogVisibility(true)}>
									<Github />
								</span>
							</Tooltip>
						</li>
						{getLocaleSelector()}
						<li>
							<Button className={styles.tourBtn} onClick={showTourDialog}>
								<Person />
								<span>{i18n.takeTour}</span>
							</Button>
						</li>
						{customFooterLinks}
						<li>
							<ActivePacketsList />
						</li>
					</ul>

					<div className={generatorControlsClasses}>
						<PanelControls className={`${styles.controls} tour-panelControls`} />
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
