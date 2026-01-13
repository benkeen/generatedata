import { vars } from '@generatedata/shared';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  dataTemplateDialog: {
    height: '100%'
  },

  // :global(.MuiDialog-paper) {
  // 	height: 100%;
  // }

  actions: {
    '& button': {
      '& svg': {
        fill: vars.primaryColor,
        height: '18px',
        width: '18px',
        marginRight: '6px',
        marginLeft: '-4px'
      }
    }
  },

  // h4 {
  // 	margin-top: 0;
  // }

  // :global(.MuiDialogContent-root) {
  // 	font-size: 13px;
  // 	line-height: 20px;
  // }

  content: {
    height: '450px',
    '& > *': {
      height: '100%',
      '& > *': {
        height: '100%'
      }
    }
  },

  dataTemplateDialogInner: {
    width: '800px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }
});
