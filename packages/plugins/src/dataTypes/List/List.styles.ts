import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  colLabel: {
    display: 'flex',
    flex: '0 0 120px',
    alignItems: 'center',
    marginTop: '5px',
    '& svg': {
      marginLeft: '5px'
    }
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',

    '& > ul': {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      '& li': {
        marginBottom: '5px'
      }
    }
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '10px'
  }
});
