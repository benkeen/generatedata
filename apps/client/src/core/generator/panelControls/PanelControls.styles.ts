import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  builderControls: {
    margin: '0 6px 0 12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 1px #cccccc',
    '& > button': {
      border: 0
    },
    '& svg': {
      fill: '#aaaaaa'
    }
    // :global(.MuiButton-root) {
    // 	font-size: 11px;
    // 	color: #444444;
    // }
  },
  dataTemplateControls: {
    margin: '0 6px 0 0',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 1px #cccccc',
    '& > button': {
      border: 0
    },
    '& svg': {
      fill: '#aaaaaa'
    },
    '& .MuiButton-startIcon': {
      marginRight: 0
    }
  },
  btnSelected: {
    '& svg': {
      fill: '#aaaaaa'
    }
  },
  toggleLayoutBtn: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRight: 0,
    width: '40px',
    '& button': {
      height: '30px',
      width: '40px',
      minWidth: 'inherit'
    }
  },

  // :global(.MuiButton-root.Mui-disabled).
  toggleLayoutBtnDisabled: {
    border: 0,
    '& svg': {
      fill: '#dddddd'
    }
  }
});
