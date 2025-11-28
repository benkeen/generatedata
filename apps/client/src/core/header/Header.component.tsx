import React from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LoginDialog from '../dialogs/login/Login.container';
import PasswordResetDialog from '../dialogs/passwordReset/PasswordReset.container';
import GeneratorControls from './GeneratorControls.container';
import C from '@generatedata/config/constants';
import HeaderLinks, { MobileLinks } from './HeaderLinks.component';
import { getHeaderLinks, getGeneratorPageRoute, isGeneratorPage } from '~utils/routeUtils';
import { AccountType } from '~types/account';
// import sharedStyles from '../../styles/shared.scss';
import { GDLocale } from '~types/general';
import { useClasses } from './Header.styles';
import { useSharedClasses } from '@generatedata/core';

export type HeaderProps = {
  locale: GDLocale;
  currentPage: string;
  isLoggedIn: boolean;
  accountType: AccountType;
  showLoginDialog: () => void;
  i18n: any;
  onLogout: () => void;
  isAuth: boolean;
  profileImage: string | null;
  isOnloadAuthDetermined: boolean;
};

const Header = ({
  i18n,
  locale,
  showLoginDialog,
  profileImage,
  isLoggedIn,
  onLogout,
  accountType,
  isOnloadAuthDetermined,
  currentPage
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const windowSize = useWindowSize();
  const classNames = useClasses();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const getNav = (): React.ReactNode => {
    const headerLinks = getHeaderLinks(isLoggedIn, accountType);

    if (windowSize.width <= C.SMALL_SCREEN_WIDTH) {
      return (
        <>
          <Button aria-controls="nav-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon fontSize="large" />
          </Button>
          {isOnloadAuthDetermined && (
            <Menu id="nav-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MobileLinks
                locale={locale}
                profileImage={profileImage}
                currentPage={currentPage}
                headerLinks={headerLinks}
                showLoginDialog={showLoginDialog}
                onLogout={onLogout}
                i18n={i18n}
              />
            </Menu>
          )}
        </>
      );
    }

    return (
      <ul className={classNames.headerLinks}>
        {isOnloadAuthDetermined ? (
          <HeaderLinks
            locale={locale}
            profileImage={profileImage}
            currentPage={currentPage}
            headerLinks={headerLinks}
            showLoginDialog={showLoginDialog}
            onLogout={onLogout}
            i18n={i18n}
          />
        ) : null}
      </ul>
    );
  };

  let generatorControlsClasses = `${classNames.generatorControls} ${classNames.controls}`;
  let generatorControlsDisabled = true;
  let logoClasses = classNames.mainLogo;

  if (isGeneratorPage(currentPage, locale)) {
    generatorControlsClasses += ` ${classNames.visible}`;
    generatorControlsDisabled = false;
  } else {
    logoClasses += ` ${classNames.visible}`;
  }

  return (
    <>
      <header className={classNames.header}>
        <div className={classNames.headerInner}>
          <h1 className={classNames.headerLogo}>
            <img src="./images/dice80.png" width={40} height={40} alt={i18n.siteLogo} />
          </h1>
          <div className={logoClasses}>
            <img src="./images/logo.png" alt="generatedata.com" />
          </div>
          <div className={generatorControlsClasses}>
            <GeneratorControls disabled={generatorControlsDisabled} />
          </div>
          <nav>{getNav()}</nav>
        </div>
      </header>
      <LoginDialog />
      <PasswordResetDialog />
    </>
  );
};

export default Header;
