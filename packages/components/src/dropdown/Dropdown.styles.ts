import { makeStyles } from '@griffel/react';
import { error } from '../styles/variables';

export const useStyles = makeStyles({
  error: {
    '& > div': {
      border: `1px solid ${error} !important`
    }
  }
});
