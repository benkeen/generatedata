import ar from '@generatedata/i18n/ar';
import de from '@generatedata/i18n/de';
import en from '@generatedata/i18n/en';
import es from '@generatedata/i18n/es';
import fr from '@generatedata/i18n/fr';
import hi from '@generatedata/i18n/hi';
import ja from '@generatedata/i18n/ja';
import nl from '@generatedata/i18n/nl';
import pt from '@generatedata/i18n/pt';
import ta from '@generatedata/i18n/ta';
import zh from '@generatedata/i18n/zh';
import { GDLocale } from '@generatedata/types';

export const getStrings = (locale: GDLocale) => {
  const map: { [key in GDLocale]: any } = { ar, de, en, es, fr, hi, ja, nl, pt, ta, zh };
  return map[locale];
};

// this and the following method are currently duplicated here. Need to convert the BE code to use TS
export const getI18n = (i18nString: string, placeholders: any[]) => {
  const parts = i18nString.split(/(%\d+)/);
  const parsed = [];

  parts.forEach((part) => {
    if (/%\d+/.test(part)) {
      const index = parseInt(part.replace('%', ''), 10) - 1;

      if (index < placeholders.length) {
        parsed.push(placeholders[index]);

        // if there's no placeholder for this, just add the original value which looked like a placeholder
      } else {
        parsed.push(part);
      }
    } else {
      parsed.push(part);
    }
  });

  return parsed;
};

export const getI18nString = (i18nString: string, placeholders: any[]) => getI18n(i18nString, placeholders).join('');
