import React from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialog from '../dialogs/login/Login.container';
import GeneratorControls from './GeneratorControls.container';
import { GeneratorPanel, GDLocale } from '~types/general';
import C from '../constants';
import HeaderLinks from './HeaderLinks.component';
import { getHeaderLinks } from '~utils/routeUtils';
import { AccountType } from '~types/account';
import sharedStyles from '../../styles/shared.scss';
import styles from './Header.scss';

export type HeaderProps = {
	currentPage: string;
	onChangeSmallScreenVisiblePanel: () => void;
	isLoggedIn: boolean;
	accountType: AccountType;
	smallScreenVisiblePanel: GeneratorPanel;
	showLoginDialog: () => void;
	locale: GDLocale;
	i18n: any;
	onLogout: () => void;
	isAuth: boolean;
	profileImage: string | null;
	isOnloadAuthDetermined: boolean;
};

const Header = ({
	smallScreenVisiblePanel, i18n, showLoginDialog, onChangeSmallScreenVisiblePanel, profileImage,
	isLoggedIn, onLogout, accountType, isOnloadAuthDetermined, currentPage
}: HeaderProps): JSX.Element => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	// TODO put in the top-level app. Here's not appropriate
	const windowSize = useWindowSize();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
	};

	/*
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
	*/

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
			<ul className={styles.headerLinks}>
				{isOnloadAuthDetermined ?
					<HeaderLinks
						profileImage={profileImage}
						currentPage={currentPage}
						headerLinks={getHeaderLinks(isLoggedIn, accountType)}
						showLoginDialog={showLoginDialog}
						onLogout={onLogout}
						i18n={i18n}
					/> : null
				}
			</ul>
		);
	};

	let generatorControlsClasses = `${sharedStyles.generatorControls} ${styles.controls}`;
	let generatorControlsDisabled = true;
	let logoClasses = sharedStyles.mainLogo;
	if (currentPage === process.env.GD_GENERATOR_PATH) {
		generatorControlsClasses += ` ${sharedStyles.visible}`;
		generatorControlsDisabled = false;
	} else {
		logoClasses += ` ${sharedStyles.visible}`;
	}

	return (
		<>
			<header className={styles.header}>
				<div style={{ position: 'relative' }}>
					<h1>
						<img
							src="./images/dice80.png"
							width={40}
							height={40}
							alt={i18n.siteLogo}
						/>
					</h1>
					<div className={logoClasses}>
						<img src="./images/logo.png" alt="generatedata.com" />
					</div>
					<div className={generatorControlsClasses}>
						<GeneratorControls disabled={generatorControlsDisabled} />
					</div>
					<nav>
						{getNav()}
					</nav>
				</div>
			</header>
			<LoginDialog />
		</>
	);
};

export default Header;
