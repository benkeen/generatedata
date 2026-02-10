import { useSelector } from 'react-redux';
import * as selectors from '~store/generator/generator.selectors';

export const useEmailContainer = () => {
  const i18n = useSelector(selectors.getCoreI18n);
  return { i18n };
};
