import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',

    '& label': {
      flex: '0 0 150px',
      color: '#666666'
    },
    '& input': {
      flex: 1
    }
  }
});
