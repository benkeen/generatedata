import { makeStaticStyles, makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  copyIcon: {
    color: '#bbbbbb',
    cursor: 'pointer',
    fontSize: '12px'
  }
});

export const useStaticStyles = makeStaticStyles({
  '.MuiAlert-message': {
    fontSize: '13px'
  }
});
