import { vars } from '@generatedata/shared';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  buttonLabel: {
    marginTop: '4px'
  },
  validLengthsTip: {
    '& b': {
      color: vars.primaryColor,
      fontWeight: 'bold'
    },
    margin: '2px 0 6px'
  },
  error: {
    color: vars.error,
    padding: '2px 0 6px'
  },
  noCreditCards: {
    color: '#666666',
    fontStyle: 'italic'
  }
});
