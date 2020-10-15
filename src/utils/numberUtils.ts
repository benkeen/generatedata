import { GDLocale } from '~types/general';

export const getFormattedNum = (num: number, locale: GDLocale): string => {
	return Intl.NumberFormat(locale).format(num);
};
