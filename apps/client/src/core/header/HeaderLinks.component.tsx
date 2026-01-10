import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
import { GDCustomHeaderLink, GDHeaderLink, GDLocale } from '~types/general';
import { getUnlocalizedGeneratorRoute, removeLocale } from '~utils/routeUtils';
import { Tooltip } from '@generatedata/core';
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
  const links: any = [];

  headerLinks.forEach((headerLink, index) => {
    if (typeof headerLink === 'object' && headerLink.path) {
      const link = headerLink as GDCustomHeaderLink;
      links.push(
        <li key={link.path} className={getClassName(classNames, link.path, currentPage)}>
          <Link to={getLink(link.path, locale)}>{i18n[link.labelI18nKey]}</Link>
        </li>
      );
    } else if (headerLink === 'generator') {
      links.push(
        <li key="generator" className={getClassName(classNames, generatorPath, currentPage)}>
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
        <li key="dataSets" className={getClassName(classNames, 'datasets', currentPage)}>
          <Link to={getLink('/datasets', locale)}>{i18n.dataSets}</Link>
        </li>
      );
    } else if (headerLink === 'userAccount') {
      const userImage = profileImage ? <img src={profileImage} /> : null;
      const classes = `${classNames.userAccount} ${getClassName(classNames, 'account', currentPage)}`;

      links.push(
        <li key="account" className={classes}>
          {userImage} <Link to={getLink('/account', locale)}>{i18n.yourAccount}</Link>
        </li>
      );
    } else if (headerLink === 'accounts') {
      links.push(
        <li key="accounts" className={getClassName(classNames, 'accounts', currentPage)}>
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
        <li key="register" className={getClassName(classNames, 'register', currentPage)}>
          <Link to={getLink('/register', locale)}>{i18n.register}</Link>
        </li>
      );
    } else if (headerLink === 'loginDialog') {
      links.push(
        <li key="loginDialog" onClick={showLoginDialog} data-ok="asdas" className={classNames.clickable}>
          {i18n.login}
        </li>
      );
    } else if (headerLink === 'loginPage') {
      links.push(
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
