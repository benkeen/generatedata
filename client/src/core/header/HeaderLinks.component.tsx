import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import { GDCustomHeaderLink, GDHeaderLink } from '~types/general';
import { getGeneratorRoute } from '~utils/routeUtils';
import { Tooltip } from '~components/tooltips';
import * as styles from './Header.scss';

export type HeaderLinksProps = {
	currentPage: string;
	headerLinks: GDHeaderLink[];
	showLoginDialog: () => void;
	onLogout: () => void;
	profileImage: string | null;
	i18n: any;
};

const getClassName = (path: string, currentPage: string): string => {
	const pathWithSlash = path.charAt(0) === '/' ? path : `/${path}`;

	if (pathWithSlash === '/' && currentPage === '/') {
		return styles.selected;
	}
	return currentPage === pathWithSlash ? styles.selected : '';
};


export const MobileLinks = ({ currentPage, headerLinks, showLoginDialog, profileImage, onLogout, i18n }: HeaderLinksProps): JSX.Element => {
	const links: any = [];
	const generatorPath = getGeneratorRoute();

	headerLinks.forEach((headerLink, index) => {
		if (typeof headerLink === 'object' && headerLink.path) {
			const link = headerLink as GDCustomHeaderLink;
			links.push(
				<MenuItem key={link.path} component={Link} className={getClassName(link.path, currentPage)} to={link.path}>
					{i18n[link.labelI18nKey]}
				</MenuItem>
			);
		} else if (headerLink === 'generator') {
			links.push(
				<MenuItem key="generator" component={Link} className={getClassName(generatorPath, currentPage)} to={generatorPath}>
					{i18n.generator}
				</MenuItem>
			);
		} else if (headerLink === 'dataSets') {
			links.push(
				<MenuItem key="dataSets" component={Link} className={getClassName('datasets', currentPage)} to="/datasets">
					{i18n.dataSets}
				</MenuItem>
			);
		} else if (headerLink === 'userAccount') {
			const classes = `${styles.userAccount} ${getClassName('account', currentPage)}`;
			links.push(
				<MenuItem key="account" component={Link} className={classes} to="/account">
					{i18n.yourAccount}
				</MenuItem>
			);
		} else if (headerLink === 'accounts') {
			links.push(
				<MenuItem key="accounts" component={Link} className={getClassName('accounts', currentPage)} to="/accounts">
					{i18n.accounts}
				</MenuItem>
			);
		} else if (headerLink === 'logout') {
			links.push(
				<MenuItem key="logout" className={styles.logoutLink} onClick={onLogout}>
					{i18n.logout}
				</MenuItem>
			);
		} else if (headerLink === 'register') {
			links.push(
				<MenuItem key="register" component={Link} className={getClassName('register', currentPage)} to="/register">
					{i18n.register}
				</MenuItem>
			);
		} else if (headerLink === 'loginDialog') {
			links.push(<MenuItem key="loginDialog" onClick={showLoginDialog}>{i18n.login}</MenuItem>);
		}
	});

	return (
		<>{links}</>
	);
};

export const HeaderLinks = ({ currentPage, headerLinks, showLoginDialog, profileImage, onLogout, i18n }: HeaderLinksProps): JSX.Element => {
	const links: any = [];
	const generatorPath = getGeneratorRoute();

	headerLinks.forEach((headerLink, index) => {
		if (typeof headerLink === 'object' && headerLink.path) {
			const link = headerLink as GDCustomHeaderLink;
			links.push(
				<li key={link.path} className={getClassName(link.path, currentPage)}>
					<Link to={link.path}>{i18n[link.labelI18nKey]}</Link>
				</li>
			);
		} else if (headerLink === 'generator') {
			links.push(
				<li key="generator" className={getClassName(generatorPath, currentPage)}>
					<Link to={generatorPath}>{i18n.generator}</Link>
				</li>
			);
		} else if (headerLink === 'separator') {
			links.push(<li key={`separator-${index}`} className={styles.divider}>|</li>);
		} else if (headerLink === 'dataSets') {
			links.push(
				<li key="dataSets" className={getClassName('datasets', currentPage)}>
					<Link to="/datasets">{i18n.dataSets}</Link>
				</li>
			);
		} else if (headerLink === 'userAccount') {
			const userImage = (profileImage) ? <img src={profileImage} /> : null;
			const classes = `${styles.userAccount} ${getClassName('account', currentPage)}`;

			links.push(
				<li key="account" className={classes}>
					{userImage} <Link to="/account">{i18n.yourAccount}</Link>
				</li>
			);
		} else if (headerLink === 'accounts') {
			links.push(
				<li key="accounts" className={getClassName('accounts', currentPage)}>
					<Link to="/accounts">{i18n.accounts}</Link>
				</li>
			);
		} else if (headerLink === 'logout') {
			links.push(
				<li className={styles.logoutLink} key="logout">
					<Tooltip title={i18n.logout} placement="bottom" arrow>
						<span>
							<IconButton size="small" aria-label={i18n.closePanel} onClick={onLogout}>
								<LogoutIcon fontSize="inherit" />
							</IconButton>
						</span>
					</Tooltip>
				</li>
			);
		} else if (headerLink === 'register') {
			links.push(
				<li key="register" className={getClassName('register', currentPage)}>
					<Link to="/register">{i18n.register}</Link>
				</li>
			);
		} else if (headerLink === 'loginDialog') {
			links.push(<li key="loginDialog" onClick={showLoginDialog}>{i18n.login}</li>);
		} else if (headerLink === 'loginPage') {
			links.push(
				<li key="loginPage" className={getClassName('loginPage', currentPage)}>
					<Link to='/login'>{i18n.login}</Link>
				</li>
			);
		}
	});

	return (
		<>{links}</>
	);
};

export default HeaderLinks;
