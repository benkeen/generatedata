import { GDLocale } from '~types/general';
import { getLocale } from '~utils/langUtils';

export const getFormattedNum = (num: number, locale: GDLocale = getLocale()): string => {
	return Intl.NumberFormat(locale).format(num);
};

// @ts-ignore
export const isNumeric = (n: any): boolean => !isNaN(parseFloat(n)) && isFinite(n);

// based on a JS port of the PHP number_format() method: https://locutus.io/php/strings/number_format/
export const numberFormat = (number: number, decimals = 0, decPoint = '.', thousandsSep = ','): string => {
	const n = !isFinite(+number) ? 0 : +number;
	const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
	const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
	const dec = (typeof decPoint === 'undefined') ? '.' : decPoint;

	const toFixedFix = (num: number, precision: number): any => {
		if (('' + num).indexOf('e') === -1) {
			return +(Math.round(Number(n + 'e+' + precision)) + 'e-' + precision);
		} else {
			const arr = ('' + n).split('e');
			let sig = '';
			if (+arr[1] + prec > 0) {
				sig = '+';
			}
			return (+(Math.round(Number(+arr[0] + 'e' + sig + (+arr[1] + precision))) + 'e-' + precision)).toFixed(precision);
		}
	};

	const s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}

	return s.join(dec);
};
