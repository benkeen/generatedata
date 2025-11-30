import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '12px',
    // col1: {
    // flex: '0 0 60px',
    // fontWeight: 'bold',
    // },
    // col2: {
    // flex: 1
    // },

    '& label': {
      backgroundColor: '#dfecfc',
      borderRadius: '3px',
      padding: '1px 6px'
    }
  },
  col1: {
    flex: '0 0 60px',
    fontWeight: 'bold'
  },
  col2: {
    flex: 1
  }
});
