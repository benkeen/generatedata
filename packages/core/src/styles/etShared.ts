import { makeStyles } from '@griffel/react';

export const useETStyles = makeStyles({
  settingRow: {
    marginTop: '10px',
    '& label': {
      display: 'block',
      marginBottom: '4px',
      color: '#666666'
    },
    '& button': {
      marginRight: '6px',
      width: 'inherit'
    }
  }
});
