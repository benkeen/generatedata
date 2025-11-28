import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  tabContent: {
    padding: '20px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    height: '40px',
    alignItems: 'center'
  },
  label: {
    flex: '0 0 180px'
  },
  field: {
    flex: 1
  },
  panelHorizontal: {
    width: '100%'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    height: '100%',

    '& button': {
      width: '50%'
    },
    '& section': {
      flex: 1
    },
    '& footer': {
      padding: '15px',
      '& button': {
        width: '100%',
        '& svg': {
          marginRight: '5px'
        }
      }
    }
  },

  exportFormatRow: {
    backgroundImage: 'url("./images/bg.png")',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    height: 'inherit'

    // label: {
    // fontSize: '14px',
    // flex: '0 0 140px'
    // }
  },

  spinner: {
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)'

    // 	&.fadeOut {
    // 		opacity: 0;
    // 		transition: opacity 0.25s ease-in-out;
    // 	}
  }
});
