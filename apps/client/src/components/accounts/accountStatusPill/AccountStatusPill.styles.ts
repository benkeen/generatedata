import type { AccountStatus } from '@generatedata/server';
import { makeStyles, mergeClasses } from '@griffel/react';

const useBaseClasses = makeStyles({
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

export const useClasses = (status: AccountStatus) => {
  const baseClasses = useBaseClasses();

  return {
    pill: mergeClasses(baseClasses.pill, baseClasses[status])
  };
};
