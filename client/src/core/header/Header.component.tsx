import React from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-hooks-window-size';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialog from '../dialogs/login/Login.container';
import IntroDialog from '../dialogs/intro/Intro.component';
import { GDLocale } from '~types/general';
import C from '../constants';
import * as styles from './Header.scss';
import { GeneratorPanel } from '~store/generator/generator.reducer';

export type HeaderProps = {
	toggleIntroDialog: () => void;
	onChangeSmallScreenVisiblePanel: () => void;
	isLoggedIn: boolean;
	smallScreenVisiblePanel: GeneratorPanel;
	showIntroDialog: boolean;
	showLoginDialog: boolean;
	toggleLoginDialog: () => void;
	locale: GDLocale;
	i18n: any;
	onLogout: () => void;
	userTokenVerified: boolean;
};

const Header = ({
	smallScreenVisiblePanel, i18n, toggleIntroDialog, showIntroDialog, toggleLoginDialog,
	onChangeSmallScreenVisiblePanel, isLoggedIn, onLogout, userTokenVerified
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

	const getHeaderLinks = (): JSX.Element | null => {
		if (!userTokenVerified) {
			return null;
		}

		if (isLoggedIn) {
			return (
				<>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/">Generator</Link></li>
					<li>|</li>
					<li>
						<Link to="/account">Account</Link>
					</li>
					<li onClick={onLogout}>Logout</li>
				</>
			);
		}

		return (
			<>
				<li><Link to="/about">About</Link></li>
				<li><Link to="/">Generator</Link></li>
				<li><Link to="/signup">Sign Up</Link></li>
				<li>|</li>
				<li onClick={toggleLoginDialog}>Login</li>
			</>
		);
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
				{getHeaderLinks()}
			</ul>
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
			<IntroDialog
				visible={showIntroDialog}
				onClose={toggleIntroDialog}
				i18n={i18n}
			/>
			<LoginDialog />
		</>
	);
};

export default Header;
