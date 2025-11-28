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
  }
});

// .panel {
// 	display: flex;
// 	flex-direction: column;
// 	width: 400px;
// 	height: 100%;

// 	h2 {
// 		display: flex;
// 		align-items: center;
// 		flex: 0 0 auto;
// 		margin: 15px 20px;

// 		span {
// 			flex: 1;
// 		}

// 		svg {
// 			margin-right: 5px;
// 			font-size: 19px;
// 			fill: #888888;
// 		}
// 	}

// 	section {
// 		display: flex;
// 		flex-direction: column;
// 		flex: 1;
// 		overflow: hidden;
// 		padding: 0 20px;
// 	}

// 	footer {
// 		flex: 0 0 auto;
// 		padding: 15px;
// 		button {
// 			width: 100%;

// 			svg {
// 				margin-right: 5px;
// 			}
// 		}
// 	}
// }

// div.selectedRow {
// 	border: 1px solid c.$primary-color;
// 	background-color: c.$primary-pale-color;
// 	border-radius: 4px;
// }

// .row {
// 	padding: 6px;
// 	border: 1px solid transparent;
// 	transition: all 0.2s ease-in-out;

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

// 	.edit {
// 		margin-right: 10px;
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
// 	}
// }

// .currentVersionRow {
// 	flex: 0 0 auto;

// 	.row {
// 		border: 1px solid c.$secondary-color;
// 		background-color: c.$secondary-pale-color;
// 		color: c.$secondary-dark-color;
// 		margin-bottom: 10px;
// 		border-radius: 4px;
// 	}
// }
