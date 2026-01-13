import ar from '@generatedata/i18n/ar';
import de from '@generatedata/i18n/de';
import en from '@generatedata/i18n/en';
import es from '@generatedata/i18n/es';
import fr from '@generatedata/i18n/fr';
import hi from '@generatedata/i18n/hi';
import ja from '@generatedata/i18n/ja';
import nl from '@generatedata/i18n/nl';
import pt from '@generatedata/i18n/pt';
import ru from '@generatedata/i18n/ru';
import ta from '@generatedata/i18n/ta';
import zh from '@generatedata/i18n/zh';
import type { GDLocale } from '@generatedata/config';

export { getI18n, getI18nString } from '@generatedata/utils/lang';

export const getStrings = (locale: GDLocale) => {
  const map: { [key in GDLocale]: any } = { ar, de, en, es, fr, hi, ja, nl, pt, ru, ta, zh };
  return map[locale];
};
