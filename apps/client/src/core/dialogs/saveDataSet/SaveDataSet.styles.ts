import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  contentPanel: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden !important',
    padding: '10px 16px',
    '& ul': {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      '& li': {
        display: 'flex',
        marginBottom: '4px'
      },
      '& input': {
        marginRight: '5px'
      }
    }
  },
  notLoggedIn: {
    margin: '8px 0',
    lineHeight: '20px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: '#275eb5',
      opacity: 0.8,
      fontSize: '50px',
      marginRight: '18px'
    }
  },
  newDataSet: {
    flex: 1,
    '& input': {
      fontSize: '14px',
      width: '100%'
    }
  },
  existingDataSet: {
    fontSize: '14px'
  }
});
