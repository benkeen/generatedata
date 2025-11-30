import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  settings: {
    display: 'flex',
    '&>div': {
      flex: 1
    },
    '& label': {
      display: 'block'
    }
  }
});
