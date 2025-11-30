import { vars } from '@generatedata/core';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    height: '30px',
    alignItems: 'center',
    // .col1 {
    // 	flex: 0 0 120px,
    // }
    // .col2 {
    // 	flex: 1,
    // }

    '& label': {
      backgroundColor: '#dfecfc',
      borderRadius: '3px',
      padding: '1px 6px'
    }
  },
  col1: {
    flex: '0 0 120px'
  },
  col2: {
    flex: 1
  },
  copyCol: {
    flex: '0 0 26px'
  },
  copy: {
    margin: '4px 0 0 4px'
  },
  pillField: {
    flex: 1,
    marginRight: '2px'
  },
  optionsBtn: {
    marginRight: '4px'
  },
  regionalNamesIcon: {
    color: vars.primarySubmitHover
  },
  anyNamesIcon: {
    color: '#cccccc'
  }
});
