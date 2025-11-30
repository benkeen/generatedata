import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    marginBottom: '15px',

    '& label': {
      backgroundColor: '#dfecfc',
      borderRadius: '3px',
      padding: '1px 6px'
    }
  },
  col1: {
    flex: '0 0 160px'
  },
  col2: {
    flex: 1
  },

  copyCol: {
    flex: '0 0 26px'
  },

  copy: {
    margin: '4px 0 0 4px'
  }
});
