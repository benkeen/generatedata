import { GDLocale } from '~types/general';
import { getLocale } from '~utils/langUtils';

export const getFormattedNum = (num: number, locale: GDLocale = getLocale()): string => {
	return Intl.NumberFormat(locale).format(num);
};

// @ts-ignore
export const isNumeric = (n: any): boolean => !isNaN(parseFloat(n)) && isFinite(n);
