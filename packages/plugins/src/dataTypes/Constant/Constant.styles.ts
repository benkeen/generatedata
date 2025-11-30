import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  options: {
    '& label': {
      marginRight: '5px'
    }
  },

  values: {
    display: 'flex',
    alignItems: 'center',
    '&>div': {
      flex: 1
    }
  }
});
