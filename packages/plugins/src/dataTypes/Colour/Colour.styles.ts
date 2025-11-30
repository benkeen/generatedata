import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  demoColours: {
    margin: 0,
    padding: 0,
    display: 'inline-flex',
    gap: '7px',
    flexWrap: 'wrap',
    listStyleType: 'none',
    '& li span': {
      width: '40px',
      height: '40px',
      display: 'inline-block',
      borderRadius: '20px'
    }
  },
  buttonLabel: {
    marginTop: '4px'
  },
  labelCol: {
    paddingRight: '20px'
  },
  settings: {
    marginBottom: '20px',
    '& tr': {
      height: '35px',
      '& td > div': {
        marginBottom: 0
      }
    }
  },
  colourDropdown: {
    width: '150px',
    display: 'inline-block'
  }
});
