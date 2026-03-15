import { makeStyles } from '@griffel/react';
import { vars } from '@generatedata/shared';

export const useClasses = makeStyles({
  helpDialog: {
    // :global(.MuiDialog-paper) {
    // 	height: 100%;
    // }
  },
  contentPanel: {
    display: 'flex',
    overflow: 'hidden !important',
    '@media (max-width: 570px)': {
      flexDirection: 'column'
    }
  },

  dialog: {
    width: '800px',
    maxWidth: 'calc(100vw - 64px)',
    height: '540px',
    maxHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },

  mobileDropdown: {
    display: 'none',
    '@media (max-width: 570px)': {
      display: 'block',
      flexShrink: 0,
      marginBottom: '6px'
    }
  },
  list: {
    flex: 1,
    overflow: 'scroll'
  },
  spinner: {
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)'
  },
  fadeOut: {
    opacity: 0,
    transition: 'opacity 0.25s ease-in-out'
  },

  helpContent: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    paddingBottom: '15px',
    overflow: 'scroll',
    fontSize: '13px',
    lineHeight: '21px'
    // p:first-child {
    // 	margin-top: 0;
    // }
  },
  dataTypeList: {
    flex: '0 0 200px',
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontSize: '13px',
    '@media (max-width: 570px)': {
      display: 'none'
    },
    '& ul': {
      margin: 0,
      listStyle: 'none',
      padding: '0 0 0 10px',
      fontSize: '12px',
      lineHeight: '20px'
    },
    '& li': {
      color: vars.primaryColor,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
});
