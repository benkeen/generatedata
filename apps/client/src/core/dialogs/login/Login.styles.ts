import { vars } from '@generatedata/core';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  loginDialog: {
    '& label': {
      color: '#999999'
    },
    '& input': {
      fontSize: '14px'
    }
  },
  withSecondCol: {
    display: 'flex',
    flexDirection: 'row'
  },
  col: {
    flex: 1
  },
  separator: {
    margin: '0 25px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderLeft: '1px solid #efefef',

    '& > div': {
      position: 'absolute',
      left: '-8px',
      backgroundColor: 'white',
      padding: '2px',
      color: '#555555'
    }
  },
  actionsRow: {
    // div.actionsRow
    justifyContent: 'space-between'
  },
  forgotPasswordLink: {
    marginLeft: '10px',
    color: '#666666',
    cursor: 'pointer',
    ':hover': {
      color: vars.primaryColor,
      textDecoration: 'underline'
    }
  }
});
