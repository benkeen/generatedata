import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  pill: {
    borderRadius: '3px',
    padding: '1px 6px 2px',
    fontSize: '11px'
  },
  live: {
    backgroundColor: 'green',
    color: 'white'
  },
  disabled: {
    backgroundColor: '#999999',
    color: 'white'
  },
  expired: {
    backgroundColor: '#990000',
    color: 'white'
  }
});
