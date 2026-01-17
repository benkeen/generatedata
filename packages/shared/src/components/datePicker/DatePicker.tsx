import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2';
import { getLocale } from '@generatedata/utils/lang';
import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { arDZ, de, enUS, es, fr, hi, ja, nl, pt, ru, ta, zhCN } from 'date-fns/locale';
import React from 'react';

export const DatePicker = (props: MobileDatePickerProps) => {
  const locale = getLocale();

  const localeMap: Record<string, any> = {
    ar: arDZ,
    en: enUS,
    fr,
    de,
    es,
    ja,
    hi,
    nl,
    pt,
    ru,
    ta,
    zh: zhCN
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
      <MobileDatePicker {...props} />
    </LocalizationProvider>
  );
};
