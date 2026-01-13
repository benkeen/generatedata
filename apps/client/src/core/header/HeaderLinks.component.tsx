import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
import { GDCustomHeaderLink, GDHeaderLink, GDLocale } from '~types/general';
import { getUnlocalizedGeneratorRoute, removeLocale } from '~utils/routeUtils';
import { Tooltip } from '@generatedata/shared';
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

const getClassName = (classNames: any, path: string, currentPage: string): string => {
  const currentPageWithoutLocale = removeLocale(currentPage);
  const pathWithSlash = path.charAt(0) === '/' ? path : `/${path}`;

  if (pathWithSlash === '/' && currentPage === '/') {
    return classNames.selected;
  }

  return currentPageWithoutLocale === pathWithSlash ? classNames.selected : '';
};

const getLink = (link: string, locale: GDLocale): string => (locale === 'en' ? link : `/${locale}${link}`);

export const MobileLinks = ({ locale, currentPage, headerLinks, showLoginDialog, onLogout, i18n }: HeaderLinksProps) => {
  const classNames = useClasses();
  const generatorPath = getUnlocalizedGeneratorRoute();

  const links = headerLinks.map((headerLink) => {
    if (typeof headerLink === 'object' && headerLink.path) {
      const link = headerLink as GDCustomHeaderLink;
      return (
        <MenuItem
          key={link.path}
          component={Link}
          className={getClassName(classNames, link.path, currentPage)}
          to={getLink(link.path, locale)}
        >
          {i18n[link.labelI18nKey]}
        </MenuItem>
      );
    }

    if (headerLink === 'generator') {
      return (
        <MenuItem
          key="generator"
          component={Link}
          className={getClassName(classNames, generatorPath, currentPage)}
          to={getLink(generatorPath, locale)}
        >
          {i18n.generator}
        </MenuItem>
      );
    }

    if (['dataSets', 'accounts', 'register'].includes(headerLink as string)) {
      return (
        <MenuItem
          key={headerLink as string}
          component={Link}
          className={getClassName(classNames, headerLink as string, currentPage)}
          to={getLink(`/${headerLink}`, locale)}
        >
          {i18n.dataSets}
        </MenuItem>
      );
    }

    if (headerLink === 'userAccount') {
      const classes = `${classNames.userAccount} ${getClassName(classNames, 'account', currentPage)}`;
      return (
        <MenuItem key="account" component={Link} className={classes} to={getLink('/account', locale)}>
          {i18n.yourAccount}
        </MenuItem>
      );
    }

    if (headerLink === 'logout') {
      return (
        <MenuItem key="logout" className={classNames.logoutLink} onClick={onLogout}>
          {i18n.logout}
        </MenuItem>
      );
    }

    if (headerLink === 'loginDialog') {
      return (
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
  const classNames = useClasses();
  const generatorPath = getUnlocalizedGeneratorRoute();

  const links = headerLinks.map((headerLink, index) => {
    if (typeof headerLink === 'object' && headerLink.path) {
      const link = headerLink as GDCustomHeaderLink;
      return (
        <li key={link.path} className={getClassName(classNames, link.path, currentPage)}>
          <Link to={getLink(link.path, locale)}>{i18n[link.labelI18nKey]}</Link>
        </li>
      );
    }

    if (headerLink === 'generator') {
      return (
        <li key="generator" className={getClassName(classNames, generatorPath, currentPage)}>
          <Link to={getLink(generatorPath, locale)}>{i18n.generator}</Link>
        </li>
      );
    }

    if (headerLink === 'separator') {
      return (
        <li key={`separator-${index}`} className={classNames.divider}>
          |
        </li>
      );
    }

    if (headerLink === 'dataSets') {
      return (
        <li key="dataSets" className={getClassName(classNames, 'datasets', currentPage)}>
          <Link to={getLink('/datasets', locale)}>{i18n.dataSets}</Link>
        </li>
      );
    }

    if (headerLink === 'userAccount') {
      const userImage = profileImage ? <img src={profileImage} /> : null;
      const classes = `${classNames.userAccount} ${getClassName(classNames, 'account', currentPage)}`;

      return (
        <li key="account" className={classes}>
          {userImage} <Link to={getLink('/account', locale)}>{i18n.yourAccount}</Link>
        </li>
      );
    }

    if (headerLink === 'accounts') {
      return (
        <li key="accounts" className={getClassName(classNames, 'accounts', currentPage)}>
          <Link to={getLink('/accounts', locale)}>{i18n.accounts}</Link>
        </li>
      );
    }
    if (headerLink === 'logout') {
      return (
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
    }
    if (headerLink === 'register') {
      return (
        <li key="register" className={getClassName(classNames, 'register', currentPage)}>
          <Link to={getLink('/register', locale)}>{i18n.register}</Link>
        </li>
      );
    }
    if (headerLink === 'loginDialog') {
      return (
        <li key="loginDialog" onClick={showLoginDialog} data-ok="asdas" className={classNames.clickable}>
          {i18n.login}
        </li>
      );
    }

    if (headerLink === 'loginPage') {
      return (
        <li key="loginPage" className={getClassName(classNames, 'loginPage', currentPage)}>
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
