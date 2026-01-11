import { vars } from '@generatedata/core';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  contentPanel: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden !important',
    padding: '10px 16px',

    '& svg': {
      color: 'orange',
      fontSize: '50px',
      marginRight: '10px'
    },

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
  clearPageSelection: {
    '& svg': {
      fontSize: '18px',
      color: vars.primaryColor,
      marginLeft: '6px'
    }
  }
});
