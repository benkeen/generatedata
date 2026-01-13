import { makeStyles } from '@griffel/react';
import { vars } from '@generatedata/shared';

export const useClasses = makeStyles({
  helpDialog: {
    height: '100%'

    // :global(.MuiDialog-paper) {
    // 	height: 100%;
    // }
  },
  contentPanel: {
    display: 'flex',
    overflow: 'hidden !important'
  },

  dialog: {
    width: '800px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  list: {
    flex: 1,
    overflow: 'scroll'
  },
  spinner: {
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)'

    // '&.fadeOut': {
    //   opacity: 0,
    //   transition: 'opacity 0.25s ease-in-out'
    // }
  },
  fadeOut: {
    opacity: 0,
    transition: 'opacity 0.25s ease-in-out'
  },

  helpContent: {
    position: 'relative',
    flex: 1,
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

    // 	input {
    // 		width: 100%;
    // 		flex: 0 0 auto;
    // 	}

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
