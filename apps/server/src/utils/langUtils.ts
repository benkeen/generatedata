import ar from '@generatedata/i18n-core/ar';
import de from '@generatedata/i18n-core/de';
import en from '@generatedata/i18n-core/en';
import es from '@generatedata/i18n-core/es';
import fr from '@generatedata/i18n-core/fr';
import hi from '@generatedata/i18n-core/hi';
import ja from '@generatedata/i18n-core/ja';
import nl from '@generatedata/i18n-core/nl';
import pt from '@generatedata/i18n-core/pt';
import ru from '@generatedata/i18n-core/ru';
import ta from '@generatedata/i18n-core/ta';
import zh from '@generatedata/i18n-core/zh';
import type { GDLocale } from '@generatedata/config';

export { getI18n, getI18nString } from '@generatedata/utils/lang';

export const getStrings = (locale: GDLocale) => {
  const map: { [key in GDLocale]: any } = { ar, de, en, es, fr, hi, ja, nl, pt, ru, ta, zh };
  return map[locale];
};
