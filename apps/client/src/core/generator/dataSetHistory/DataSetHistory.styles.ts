import { vars } from '@generatedata/core';
import { makeStyles, shorthands } from '@griffel/react';

export const useClasses = makeStyles({
  dataSetHistoryBtnClass: {
    // button.dataSetHistoryBtnClass
    color: 'white',
    ...shorthands.borderColor('#ffffff'),

    ':disabled': {
      color: 'white',
      ...shorthands.borderColor('#ffffff'),
      opacity: 0.2
    }
  },
  rows: {
    flex: 1,
    overflow: 'auto'
  },
  rowWrapper: {
    display: 'flex',
    fontSize: '13px',
    alignItems: 'center'
  },
  currentVersionRow: {
    flex: '0 0 auto',
    row: {
      border: `1px solid ${vars.secondaryColor}`,
      backgroundColor: vars.secondaryPaleColor,
      color: vars.secondaryDarkColor,
      marginBottom: '10px',
      borderRadius: '4px'
    }
  },
  edit: {
    marginRight: '10px'
  },

  panel: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    height: '100%',

    '& h2': {
      display: 'flex',
      alignItems: 'center',
      flex: '0 0 auto',
      margin: '15px 20px',
      '& span': {
        flex: 1
      },
      '& svg': {
        marginRight: '5px',
        fontSize: '19px',
        fill: '#888888'
      }
    },
    '& section': {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      overflow: 'hidden',
      padding: '0 20px'
    },

    '& footer': {
      flex: '0 0 auto',
      padding: '15px',
      '& button': {
        width: '100%',

        '& svg': {
          marginRight: '5px'
        }
      }
    }
  },
  selectedRow: {
    // div.selectedRow
    border: `1px solid ${vars.primaryColor}`,
    backgroundColor: vars.primaryPaleColor,
    borderRadius: '4px'
  },
  row: {
    padding: '6px',
    border: '1px solid transparent',
    transition: 'all 0.2s ease-in-out'

    // 	label {
    // 		color: #999999;
    // 		font-size: 11px;
    // 	}

    // 	.id {
    // 		margin-left: 10px;
    // 		flex: 0 1 50px;
    // 		color: #999999;
    // 		overflow: hidden;
    // 		text-overflow: ellipsis;
    // 		white-space: nowrap;
    // 	}

    // 	.dateCreated {
    // 		flex: 1;
    // 		overflow: hidden;
    // 		text-overflow: ellipsis;
    // 		white-space: nowrap;
    // 	}

    // 	.del {
    // 		flex: 0 0 30px;
    // 		align-items: center;
    // 		cursor: pointer;

    // 		&.disabled {
    // 			cursor: inherit;

    // 			svg {
    // 				opacity: 0.2;
    // 			}
    // 		}

    // 		&:hover {
    // 			svg {
    // 				fill: #990000;
    // 			}
    // 		}
  },

  id: {
    marginLeft: '10px',
    flex: '0 1 50px',
    color: '#999999',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  dateCreated: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  del: {
    flex: '0 0 30px',
    alignItems: 'center',
    cursor: 'pointer',

    '&.disabled': {
      cursor: 'inherit',

      '& svg': {
        opacity: 0.2
      }
    },

    '&:hover': {
      '& svg': {
        fill: '#990000'
      }
    }
  }
});
