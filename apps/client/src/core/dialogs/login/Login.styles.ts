import { vars } from '@generatedata/shared';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  loginDialog: {
    '& label': {
      color: '#999999'
    },
    '& input': {
      fontSize: '14px'
    },
    '& .MuiDialog-paper': {
      '@media (max-width: 570px)': {
        maxWidth: 'calc(100vw - 32px) !important',
        margin: '16px !important',
        width: 'calc(100vw - 32px) !important'
      }
    }
  },
  withSecondCol: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width:570px)': {
      flexDirection: 'column'
    }
  },
  col: {
    flex: 1,
    minWidth: 0
  },
  separator: {
    margin: '0 25px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderLeft: '1px solid #efefef',
    flex: '0 0 auto',

    '& > div': {
      position: 'absolute',
      left: '-8px',
      backgroundColor: 'white',
      padding: '2px',
      color: '#555555'
    },

    '@media (max-width:570px)': {
      margin: '15px 0',
      borderLeft: 'none',
      borderTop: '1px solid #efefef',
      paddingTop: '10px',

      '& > div': {
        left: '50%',
        top: '-12px',
        transform: 'translateX(-50%)',
        padding: '2px 10px'
      }
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
