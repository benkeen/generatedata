import { makeStyles } from '@griffel/react';
import { vars } from '@generatedata/core';

export const useClasses = makeStyles({
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
    // div.gridHeader
    width: '100%',
    fontWeight: 'bold',
    color: '#666666',
    minHeight: '26px',
    fontSize: '13px',
    borderBottom: '1px solid black',
    borderRadius: 0
  },
  orderCol: {
    fontStyle: 'italic',
    color: '#cccccc',
    padding: '0 0 0 17px',
    marginTop: '4px',
    fontSize: '10px'
  },
  smallScreenMode: {
    display: 'none',
    position: 'absolute',
    right: '10px',
    margin: '2px 0 0',
    fontSize: '10px',
    cursor: 'pointer'
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
  // orderCol: {
  //   flex: '0 0 40px',
  //   display: 'flex',
  //   marginTop: '6px',
  //   padding: '4px 0 2px 2px',
  //   color: '#999999',
  //   '& svg': {
  //     color: '#cccccc'
  //   }
  // },
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
    paddingTop: '8px',
    '& svg': {
      fill: '#333333',
      transition: 'fill 0.5s ease-in-out'
    }
  },
  settingsIconCol: {
    flex: '0 0 30px',
    cursor: 'pointer',
    display: 'flex',
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

  // deleteCol: { // div.deleteCol
  //   marginRight: 0,
  //   ':hover': {
  //     '& svg': {
  //       fill: '#990000'
  //     }
  //   }
  // }

  // div.settingsIconCol: {
  //   display: 'none'
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
  }
});

// .addRows {
//   display: inline-flex,
//   align-items: center,
//   margin-bottom: 12px,
//   font-size: 12px,

//   span,
//   input {
//     margin-right: 6px,
//   }

//   input {
//     height: 28px,
//   }

//   input {
//     width: 42px,
//   }

//   button {
//     font-size: 11px,
//     min-width: 60px,
//   }
// }

// .gridSmall {
//   .examplesCol,
//   .optionsCol {
//     display: none,
//   }
//   .smallScreenMode,
//   .settingsIconCol {
//     display: inherit,
//   }
// }

// .gridMedium {
//   .examplesCol {
//     display: none,
//   }
//   .smallScreenMode {
//     display: block,
//   }
// }

// .smallScreenSettingsTooltip {
//   padding: 10px,
//   width: 280px,

//   h4 {
//     margin: 0 0 5px,

//     &:nth-child(2) {
//       margin-top: 10px,
//     }
//   }
// }
