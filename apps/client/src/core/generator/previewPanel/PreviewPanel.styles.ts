import { makeStaticStyles, makeStyles, shorthands } from '@griffel/react';

export const useClasses = makeStyles({
  previewPanel: {
    zIndex: 1400,
    height: '100%',
    '& h1': {
      margin: 0
    }
  },
  exportTypeButton: {
    color: 'white'
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px'
  },
  controls: {
    zIndex: 1300,
    justifyContent: 'flex-end',
    '& button': {
      cursor: 'pointer',
      '&:hover svg': {
        fill: '#999999'
      }
    }
  },
  previewPanelContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  panelContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  preview: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      overflow: 'hidden'
    },
    '& > div > div': {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      overflow: 'hidden'
    }
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  noResults: {
    color: 'white',
    margin: 'auto',
    position: 'relative',
    textAlign: 'center'
  },
  previewLoading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    height: '100%'
  },
  error: {
    //button.error
    ...shorthands.borderColor('#dc4040'),
    color: '#dc4040',
    '& svg': {
      fill: '#dc4040',
      marginLeft: '4px',
      marginTtop: '-1px'
    },
    '&:hover': {
      backgroundColor: '#503636',
      ...shorthands.borderColor('#dc4040')
    }
  }
});

export const useStaticStyles = makeStaticStyles({
  '#overlayPanelFullScreen': {
    position: 'absolute',
    right: 0,
    top: 0,
    left: '400px',
    bottom: 0,
    zIndex: 1400
  }
});
