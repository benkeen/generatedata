import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  colLabel: {
    display: 'flex',
    flex: '0 0 140px',
    alignItems: 'center',
    marginTop: '5px',
    '& svg': {
      marginLeft: '5px'
    }
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    '& > ul': {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      '& li': {
        marginBottom: '5px'
      }
    }
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '10px'
  },

  allowDuplicatesCheckbox: {
    marginTop: '8px'
  },
  listTableBody: {
    maxHeight: '200px',
    overflow: 'scroll'
  },

  addValueRow: {
    display: 'flex',
    margin: '5px 0 10px',

    '& label': {
      color: '#999999',
      display: 'block',
      height: '20px'
    },
    '& input': {
      marginRight: '4px'
    },
    '& button': {
      padding: '5px 6px'
    }
  }
});

// .listTable {
// 	li {
// 		display: flex;
// 		width: 100%;
// 		padding: 2px;

// 		&:nth-child(odd) {
// 			background: #efefef;
// 		}
// 	}
// 	input {
// 		width: 100%;
// 	}
// 	.valueCol {
// 		width: 100%;
// 		margin-right: 4px;
// 	}
// 	.weightCol {
// 		width: 80px;
// 	}
// 	.delCol {
// 		width: 40px;
// 		margin-left: 4px;
// 		align-self: center;
// 		cursor: pointer;

// 		&:hover {
// 			svg {
// 				fill: #990000;
// 			}
// 		}
// 	}
// 	.orderCol {
// 		width: 25px;
// 		font-weight: bold;
// 		text-align: center;
// 		align-self: center;
// 	}
// }

// ul.listTableHeader {
// 	li:nth-child(odd) {
// 		background: transparent;
// 	}
// }
