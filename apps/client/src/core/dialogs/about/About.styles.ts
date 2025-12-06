import { vars } from '@generatedata/core';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  aboutDialog: {
    '& h4': {
      marginTop: 0
    }
  },
  actions: {
    '& button svg': {
      fill: vars.primaryColor,
      height: '18px',
      width: '18px',
      marginRight: '6px',
      marginLeft: '-4px'
    }
  }
});

// .aboutDialog {
// 	.actions {
// 		button {
// 			svg {
// 				fill: c.$primary-color;
// 				height: 18px;
// 				width: 18px;
// 				margin-right: 6px;
// 				margin-left: -4px;
// 			}
// 		}
// 	}

// 	:global(.MuiDialogContent-root) {
// 		font-size: 13px;
// 		line-height: 20px;
// 	}
// }
