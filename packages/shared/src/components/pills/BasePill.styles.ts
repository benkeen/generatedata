import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    marginBottom: '10px',
    '& input': {
      margin: '0 6px 0 0'
    },
    '& > *': {
      marginRight: '10px'
    },
    '&:last-child': {
      marginRight: 0
    }
  }
});
