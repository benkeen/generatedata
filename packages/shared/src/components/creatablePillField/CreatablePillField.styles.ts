import { makeStyles } from '@griffel/react';
import { error } from '../../styles/variables';

export const useClasses = makeStyles({
  errorField: {
    '& > div': {
      border: `1px solid ${error}`
    },
    ':hover': {
      '& > div': {
        border: `1px solid ${error}`
      }
    }
  }
});
