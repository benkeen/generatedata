import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import { GDCustomHeaderLink, GDHeaderLink } from '~types/general';
import { getGeneratorRoute } from '~utils/routeUtils';
import { Tooltip } from '~components/tooltips';
import styles from './Header.scss';

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

const HeaderLinks = ({ currentPage, headerLinks, showLoginDialog, profileImage, onLogout, i18n }: HeaderLinksProps): JSX.Element => {
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
			links.push(<li key={`separator-${index}`} style={{ color: '#c0c0c3' }}>|</li>);
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
		} else if (headerLink === 'signup') {
			links.push(
				<li key="signup" className={getClassName('signup', currentPage)}>
					<Link to="/signup">{i18n.signup}</Link>
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
