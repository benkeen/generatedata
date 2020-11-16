import { createContext, useMemo, createElement, useContext } from 'react';
import { func, oneOfType, object, string, element, arrayOf } from 'prop-types';

var MuiPickersContext = createContext(null);
var MuiPickersUtilsProvider = function MuiPickersUtilsProvider(_ref) {
  var Utils = _ref.utils,
      children = _ref.children,
      locale = _ref.locale,
      libInstance = _ref.libInstance;
  var utils = useMemo(function () {
    return new Utils({
      locale: locale,
      instance: libInstance
    });
  }, [Utils, libInstance, locale]);
  return createElement(MuiPickersContext.Provider, {
    value: utils,
    children: children
  });
};
process.env.NODE_ENV !== "production" ? MuiPickersUtilsProvider.propTypes = {
  utils: func.isRequired,
  locale: oneOfType([object, string]),
  children: oneOfType([element.isRequired, arrayOf(element.isRequired)]).isRequired
} : void 0;

var checkUtils = function checkUtils(utils) {
  if (!utils) {
    // tslint:disable-next-line
    throw new Error('Can not find utils in context. You either a) forgot to wrap your component tree in MuiPickersUtilsProvider; or b) mixed named and direct file imports.  Recommendation: use named imports from the module index.');
  }
};
function useUtils() {
  var utils = useContext(MuiPickersContext);
  checkUtils(utils);
  return utils;
}

export { MuiPickersUtilsProvider as M, MuiPickersContext as a, useUtils as u };
//# sourceMappingURL=useUtils-cfb96ac9.js.map
