import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  buttonLabel: {
    marginTop: '4px'
  },

  fieldRow: {
    flex: 1,
    marginTop: '8px',

    '& label': {
      display: 'flex',
      padding: '3px 0',
      color: '#999999'
    },

    '& input': {
      width: '100%'
    },

    '& svg': {
      marginLeft: '4px'
    }
  },

  fieldsRow: {
    display: 'flex'
  }
});
