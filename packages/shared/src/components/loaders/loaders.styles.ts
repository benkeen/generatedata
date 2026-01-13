import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  dialogLoadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    opacity: 0.5,
    justifyContent: 'center',
    transition: 'all 0.5s ease-in'
  }
});
