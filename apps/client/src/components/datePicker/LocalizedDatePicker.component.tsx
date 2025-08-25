import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@mui/lab/DatePicker';
import { getLocale, getStrings } from '@generatedata/utils/lang';
import { arDZ, de, enUS, es, fr, ja, hi, nl, pt, ru, ta, zhCN } from 'date-fns/locale';

// localized wrapper for the date picker provider
export const LocalizedDatePicker = (props: any) => {
	const { core: i18n } = getStrings();

	return <DatePicker {...props} cancelLabel={i18n.cancel} />;
};

// localized wrapper for the date picker provider
export const LocalizedDatePickerProvider = ({ children }: any) => {
	const locale = getLocale();

	const localeMap = {
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
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
			{children}
		</MuiPickersUtilsProvider>
	);
};
