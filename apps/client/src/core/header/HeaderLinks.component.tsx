import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
import { GDCustomHeaderLink, GDHeaderLink, GDLocale } from '~types/general';
import { getUnlocalizedGeneratorRoute, removeLocale } from '~utils/routeUtils';
import { Tooltip } from '~components/tooltips';
import LanguageSelector from './LanguageSelector.container';
import { useClasses } from './Header.styles';

export type HeaderLinksProps = {
  locale: GDLocale;
  currentPage: string;
  headerLinks: GDHeaderLink[];
  showLoginDialog: () => void;
  onLogout: () => void;
  profileImage: string | null;
  i18n: any;
};

const getClassName = (path: string, currentPage: string): string => {
  const classNames = useClasses();
  const currentPageWithoutLocale = removeLocale(currentPage);
  const pathWithSlash = path.charAt(0) === '/' ? path : `/${path}`;

  if (pathWithSlash === '/' && currentPage === '/') {
    return classNames.selected;
  }

  return currentPageWithoutLocale === pathWithSlash ? classNames.selected : '';
};

const getLink = (link: string, locale: GDLocale): string => (locale === 'en' ? link : `/${locale}${link}`);

export const MobileLinks = ({ locale, currentPage, headerLinks, showLoginDialog, onLogout, i18n }: HeaderLinksProps) => {
  const links: any = [];
  const generatorPath = getUnlocalizedGeneratorRoute();
  const classNames = useClasses();

  headerLinks.forEach((headerLink) => {
    if (typeof headerLink === 'object' && headerLink.path) {
      const link = headerLink as GDCustomHeaderLink;
      links.push(
        <MenuItem key={link.path} component={Link} className={getClassName(link.path, currentPage)} to={getLink(link.path, locale)}>
          {i18n[link.labelI18nKey]}
        </MenuItem>
      );
    } else if (headerLink === 'generator') {
      links.push(
        <MenuItem key="generator" component={Link} className={getClassName(generatorPath, currentPage)} to={getLink(generatorPath, locale)}>
          {i18n.generator}
        </MenuItem>
      );
    } else if (headerLink === 'dataSets') {
      links.push(
        <MenuItem key="dataSets" component={Link} className={getClassName('datasets', currentPage)} to={getLink('/datasets', locale)}>
          {i18n.dataSets}
        </MenuItem>
      );
    } else if (headerLink === 'userAccount') {
      const classes = `${classNames.userAccount} ${getClassName('account', currentPage)}`;
      links.push(
        <MenuItem key="account" component={Link} className={classes} to={getLink('/account', locale)}>
          {i18n.yourAccount}
        </MenuItem>
      );
    } else if (headerLink === 'accounts') {
      links.push(
        <MenuItem key="accounts" component={Link} className={getClassName('accounts', currentPage)} to={getLink('/accounts', locale)}>
          {i18n.accounts}
        </MenuItem>
      );
    } else if (headerLink === 'logout') {
      links.push(
        <MenuItem key="logout" className={classNames.logoutLink} onClick={onLogout}>
          {i18n.logout}
        </MenuItem>
      );
    } else if (headerLink === 'register') {
      links.push(
        <MenuItem key="register" component={Link} className={getClassName('register', currentPage)} to={getLink('/register', locale)}>
          {i18n.register}
        </MenuItem>
      );
    } else if (headerLink === 'loginDialog') {
      links.push(
        <MenuItem key="loginDialog" onClick={showLoginDialog}>
          {i18n.login}
        </MenuItem>
      );
    }
  });

  return (
    <>
      {links}
      <LanguageSelector isMobile={true} />
    </>
  );
};

export const HeaderLinks = ({ locale, currentPage, headerLinks, showLoginDialog, profileImage, onLogout, i18n }: HeaderLinksProps) => {
  const links: any = [];
  const generatorPath = getUnlocalizedGeneratorRoute();
  const classNames = useClasses();

  headerLinks.forEach((headerLink, index) => {
    if (typeof headerLink === 'object' && headerLink.path) {
      const link = headerLink as GDCustomHeaderLink;
      links.push(
        <li key={link.path} className={getClassName(link.path, currentPage)}>
          <Link to={getLink(link.path, locale)}>{i18n[link.labelI18nKey]}</Link>
        </li>
      );
    } else if (headerLink === 'generator') {
      links.push(
        <li key="generator" className={getClassName(generatorPath, currentPage)}>
          <Link to={getLink(generatorPath, locale)}>{i18n.generator}</Link>
        </li>
      );
    } else if (headerLink === 'separator') {
      links.push(
        <li key={`separator-${index}`} className={classNames.divider}>
          |
        </li>
      );
    } else if (headerLink === 'dataSets') {
      links.push(
        <li key="dataSets" className={getClassName('datasets', currentPage)}>
          <Link to={getLink('/datasets', locale)}>{i18n.dataSets}</Link>
        </li>
      );
    } else if (headerLink === 'userAccount') {
      const userImage = profileImage ? <img src={profileImage} /> : null;
      const classes = `${classNames.userAccount} ${getClassName('account', currentPage)}`;

      links.push(
        <li key="account" className={classes}>
          {userImage} <Link to={getLink('/account', locale)}>{i18n.yourAccount}</Link>
        </li>
      );
    } else if (headerLink === 'accounts') {
      links.push(
        <li key="accounts" className={getClassName('accounts', currentPage)}>
          <Link to={getLink('/accounts', locale)}>{i18n.accounts}</Link>
        </li>
      );
    } else if (headerLink === 'logout') {
      links.push(
        <li className={classNames.logoutLink} key="logout">
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
          <Link to={getLink('/register', locale)}>{i18n.register}</Link>
        </li>
      );
    } else if (headerLink === 'loginDialog') {
      links.push(
        <li key="loginDialog" onClick={showLoginDialog}>
          {i18n.login}
        </li>
      );
    } else if (headerLink === 'loginPage') {
      links.push(
        <li key="loginPage" className={getClassName('loginPage', currentPage)}>
          <Link to={getLink('/login', locale)}>{i18n.login}</Link>
        </li>
      );
    }
  });

  return (
    <>
      {links}
      <LanguageSelector />
    </>
  );
};

export default HeaderLinks;
