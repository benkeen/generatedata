import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  formatHeader: {
    display: 'flex',
    '& svg': {
      color: '#666666'
    },
    '& span': {
      display: 'inline-block',
      marginRight: '4px'
    }
  },
  labelCol: {
    paddingRight: '20px'
  },
  table: {
    '& input:disabled': {
      color: '#999999'
    }
  }
});
