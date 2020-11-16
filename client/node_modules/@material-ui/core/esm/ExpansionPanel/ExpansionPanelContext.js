import * as React from 'react';
/**
 * @ignore - internal component.
 * @type {React.Context<{} | {expanded: boolean, disabled: boolean, toggle: () => void}>}
 */

var ExpansionPanelContext = /*#__PURE__*/React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ExpansionPanelContext.displayName = 'ExpansionPanelContext';
}

export default ExpansionPanelContext;