import { vars } from '@generatedata/core';
import { makeStyles, mergeClasses } from '@griffel/react';
import C from '@generatedata/config/constants';

const useBaseClasses = makeStyles({
  gridWrapper: {
    width: '100%',
    padding: '0 10px',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  },
  gridHeaderWrapper: {
    maxWidth: '1024px',
    margin: '15px auto 0'
  },
  gridHeader: {
    width: '100%',
    fontWeight: 'bold',
    color: '#666666',
    minHeight: '26px',
    fontSize: '13px',
    borderBottom: '1px solid black',
    borderRadius: 0
  },
  orderCol: {
    flex: '0 0 40px',
    display: 'flex',
    padding: '4px 0 2px 2px',
    marginTop: '6px',
    color: '#999999',
    cursor: 'pointer',
    '& svg': {
      color: '#cccccc'
    }
  },
  orderColHeader: {
    padding: '0 0 0 17px',
    marginTop: '4px',
    fontStyle: 'italic',
    color: '#cccccc',
    fontSize: '10px'
  },
  scrollableGridRows: {
    width: '100%',
    flex: 1,
    overflow: 'scroll',
    position: 'relative',
    paddingTop: '4px'
  },
  gridRowsWrapper: {
    maxWidth: '1024px',
    margin: '0 auto'
  },
  grid: {
    marginBottom: '12px'
  },
  gridRow: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '35px',
    alignItems: 'flex-start',
    borderRadius: '4px',

    '& > div': {
      marginRight: '4px',
      paddingTop: '2px'
    }
  },
  titleCol: {
    flex: 2,
    '& input': {
      width: '100%'
    }
  },
  dataTypeCol: {
    flex: 2,
    display: 'flex',
    alignItems: 'center'
  },
  dataTypeColDropdown: {
    flex: 1,
    marginRight: '3px'
  },
  dataTypeHelp: {
    flex: '0 0 15px',
    fontSize: '16px',
    '& svg': {
      color: vars.primaryColor,
      cursor: 'pointer',
      marginTop: '5px'
    }
  },
  examplesCol: {
    flex: 2
  },
  optionsCol: {
    flex: 3
  },
  deleteCol: {
    flex: '0 0 30px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '8px !important',
    '& svg': {
      fill: '#333333',
      transition: 'fill 0.5s ease-in-out'
    },
    '&:hover svg': {
      fill: '#990000'
    }
  },
  settingsIconCol: {
    display: 'flex',
    flex: '0 0 30px',
    cursor: 'pointer',
    justifyContent: 'center',
    paddingTop: '8px',
    '& svg': {
      fill: '#333333',
      transition: 'fill 0.5s ease-in-out'
    }
  },
  // div.settingsIconCol svg.disabledBtn {
  //   fill: #eeeeee,
  //   cursor: default,
  // }
  disabledBtn: {
    fill: '#eeeeee'
  },
  smallScreenSpinner: {
    marginTop: '-2px !important'
  },
  gridOverlay: {
    flex: 1,
    height: '100%',
    backgroundColor: '#f2f2f2'
  },
  smallScreenSettingsTooltip: {
    padding: '10px',
    width: '280px',

    '& h4': {
      margin: '0 0 5px'

      // &:nth-child(2) {
      //   margin-top: 10px,
      // }
    }
  },
  addRows: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '12px',
    marginTop: '12px',
    fontSize: '12px',
    '& span': {
      marginRight: '6px'
    },
    '& input': {
      marginRight: '6px',
      height: '28px',
      width: '42px'
    },
    '& button': {
      fontSize: '11px',
      minWidth: '60px'
    }
  },
  hidden: {
    display: 'none'
  }
});

export const useClasses = (width?: number | null) => {
  const baseClasses = useBaseClasses();

  let hideOptions = false;
  let hideExamples = false;
  let hideSettingsCol = true;
  if (width && width < C.GRID.SMALL_BREAKPOINT) {
    hideOptions = true;
    hideExamples = true;
    hideSettingsCol = false;
  } else if (width && width < C.GRID.MEDIUM_BREAKPOINT) {
    hideOptions = true;
  }

  const gridHeaderRow = mergeClasses(baseClasses.gridRow, baseClasses.gridHeader);
  const optionsCol = mergeClasses(baseClasses.optionsCol, hideOptions ? baseClasses.hidden : '');
  const examplesCol = mergeClasses(baseClasses.examplesCol, hideExamples ? baseClasses.hidden : '');
  const settingsIconCol = mergeClasses(baseClasses.settingsIconCol, hideSettingsCol ? baseClasses.hidden : '');

  return {
    ...baseClasses,
    gridHeaderRow,
    optionsCol,
    examplesCol,
    settingsIconCol
  };
};
