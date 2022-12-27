import fs from "fs";
import path from 'path';
import { GDLocale } from '~types/general';

export const getI18nStrings = (locale: GDLocale): any => {
	const localeFile = path.join(__dirname, `../../dist/${locale}.json`);
	return JSON.parse(fs.readFileSync(localeFile, 'utf8'));
};
