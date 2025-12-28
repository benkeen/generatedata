import { vars } from '@generatedata/core';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  cols: {
    display: 'flex',
    flexDirection: 'row'
  },
  col: {
    flex: 1,
    '& h3': {
      marginTop: 0
    }
  },
  separator: {
    margin: '0 25px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderLeft: '1px solid #efefef'
  },

  tourMask: {
    //svg.tourMask
    opacity: 0.7,
    color: '#b2bed3'
  },

  introDialog: {
    fontSize: '13px',
    '& p': {
      lineHeight: '20px'
    },
    '& button': {
      fontSize: '12px'
    }
  },
  tourPage: {
    fontSize: '13px',
    '& p': {
      lineHeight: '20px'
    },

    '& button': {
      fontSize: '12px'
    }
  },
  buttonCol: {
    fontSize: '12px',
    '& b': {
      color: vars.primaryColor
    },
    '& button': {
      marginBottom: '8px'
    }
  }
});

// div[data-tour-elem='controls'] {
// 	display: flex;
// 	justify-content: center;
// }
