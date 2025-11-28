import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  chipLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    '& > span': {
      marginRight: '5px'
    }
  },
  chip: {
    paddingRight: 0
  },
  root: {
    whiteSpace: 'nowrap'
  }
});
