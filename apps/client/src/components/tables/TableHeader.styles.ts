import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  header: {
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#666666',
    paddingTop: '2px',
    borderBottom: '1px solid #333333'
  },
  row: {
    display: 'flex',
    width: '100%',
    padding: '6px',
    alignItems: 'center',
    fontSize: '13px'
  },
  colHeader: {
    display: 'flex',
    alignItems: 'center',

    '& span': {
      flex: 1
    }
  },
  sortable: {
    // was prev in colHeader.sortable
    cursor: 'pointer',

    '& svg': {
      fontSize: '20px',
      marginRight: '6px'
    },

    '&:hover': {
      '& svg': {
        fill: '#111111'
      }
    }
  }
});
