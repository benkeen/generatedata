import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'

    // .col1 {
    // 	flex: 0 0 130px;
    // }
    // .col2 {
    // 	flex: 1;
    // }
  },

  col1: {
    flex: '0 0 130px'
  },
  col2: {
    flex: 1
  },
  buttonLabel: {
    marginTop: '4px'
  },

  // div.radioPill {
  // 	margin-bottom: 0;
  // },

  currencyLine: {
    display: 'flex',
    alignItems: 'center'
  },

  separatorLine: {
    fontStyle: 'italic',
    color: '#999999',

    '& input': {
      marginLeft: '3px'
    }
  },

  helpDialog: {
    // .row {
    // 	alignItems: 'flex-start'
    // },

    '& label': {
      backgroundColor: '#dfecfc',
      borderRadius: '3px',
      padding: '1px 6px'
    }
  }
});
