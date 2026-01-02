import React, { useCallback } from 'react';
import { IconButton, List, ListItemButton, ListItemText, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Dialog, DialogContent, DialogTitle } from '@generatedata/core';
import { Tooltip } from '@generatedata/core';
import { DialogLoadingSpinner } from '@generatedata/core';
import { GDLocale } from '~types/general';
import { useClasses } from './Header.styles';
import { useNavigate } from 'react-router';
import clientConfig from '@generatedata/config/clientConfig';
import C from '@generatedata/config/constants';

const localeList = clientConfig.appSettings.GD_LOCALES.map((locale) => ({
  value: locale,
  label: C.GD_ALL_SUPPORTED_LOCALES[locale]
}));

export type SelectorDialogProps = {
  visible: boolean;
  currentLocale: GDLocale;
  onSelect: (locale: GDLocale, navigate: any) => void;
  onClose: () => void;
  loading: boolean;
  onExited: () => void;
  i18n: any;
};

const SelectorDialog = ({ visible, currentLocale, onSelect, onClose, onExited, loading, i18n }: SelectorDialogProps) => {
  const navigate = useNavigate();
  const classNames = useClasses();

  return (
    <Dialog onClose={onClose} open={visible} TransitionProps={{ onExited }}>
      <div style={{ width: 400 }}>
        <DialogTitle onClose={onClose} className={classNames.title}>
          {i18n.selectLanguage}
          <span className={classNames.flags} />
        </DialogTitle>
        <DialogContent dividers>
          <List disablePadding>
            {localeList.map((currLocale: any) => (
              <ListItemButton
                key={currLocale.value}
                className={currentLocale === currLocale.value ? classNames.selectedLocale : ''}
                onClick={(): void => onSelect(currLocale.value, navigate)}
              >
                <ListItemText primary={currLocale.label} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
      </div>
      <DialogLoadingSpinner visible={loading} />
    </Dialog>
  );
};

export type LanguageSelectorProps = {
  i18n: any;
  locale: GDLocale;
  availableLocales: GDLocale[];
  onChangeLocale: (locale: GDLocale, history: any) => void;
  isLocaleFileLoading: boolean;
  isMobile?: boolean;
};

const LanguageSelector = ({
  locale,
  availableLocales,
  onChangeLocale,
  isLocaleFileLoading,
  i18n,
  isMobile = false
}: LanguageSelectorProps) => {
  const [dialogVisible, setSelectorDialogVisible] = React.useState(false);
  const [lastI18n, setLastI18n] = React.useState(i18n);
  const classNames = useClasses();

  const onShowSelector = useCallback(() => setSelectorDialogVisible(true), []);
  const onHideSelector = useCallback(() => setSelectorDialogVisible(false), []);
  const updateLastI18n = (): void => setLastI18n(i18n);

  if (availableLocales.length < 1) {
    return null;
  }

  // note: this actually runs on render as well, but it makes no difference
  React.useEffect(() => {
    if (!isLocaleFileLoading) {
      onHideSelector();
    }
  }, [isLocaleFileLoading]);

  const trigger = isMobile ? (
    <MenuItem onClick={onShowSelector}>{lastI18n.selectLanguage}</MenuItem>
  ) : (
    <li className={classNames.localeSelector} key="languageSelector">
      <Tooltip title={lastI18n.selectLanguage} placement="bottom" arrow>
        <span>
          <IconButton aria-label="close" size="small" onClick={onShowSelector}>
            <LanguageIcon fontSize="inherit" />
          </IconButton>
        </span>
      </Tooltip>
    </li>
  );

  return (
    <>
      {trigger}
      <SelectorDialog
        visible={dialogVisible}
        currentLocale={locale}
        onSelect={onChangeLocale}
        onClose={onHideSelector}
        i18n={lastI18n}
        loading={isLocaleFileLoading}
        onExited={updateLastI18n}
      />
    </>
  );
};

export default LanguageSelector;
