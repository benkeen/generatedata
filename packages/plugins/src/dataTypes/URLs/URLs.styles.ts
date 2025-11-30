import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  buttonLabel: {
    marginTop: '3px'
  },
  settingsRow: {
    display: 'flex',
    height: '34px'
  },
  firstCol: {
    flex: '0 0 160px'
  },
  secondCol: {
    flex: 1,
    '& input': {
      width: '100%'
    }
  },
  enabledSection: {
    color: 'black'
  },
  disabledSection: {
    color: '#cccccc'
  },
  optionsView: {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    margin: '0 0 10px',
    borderRadius: '3px',

    '& pre': {
      margin: 0
    }
  }
});
