import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    marginBottom: '15px'
  },
  rightCol: {
    flex: 1,
    marginLeft: '20px',
    borderLeft: '1px solid #f2f2f2',
    paddingLeft: '20px'
  },
  disabledFieldRow: {
    display: 'flex',
    marginBottom: '15px',
    marginTop: '2px'
  },
  rightBlock: {
    '& > div': {
      marginBottom: '15px',
      fontSize: '32px'
    }
  }
});

// @media (max-width: 720px) {
// 	.root {
// 		flex-direction: column,
// 	}

// 	.rightCol {
// 		margin-top: 20px,
// 		margin-left: 0,
// 		border-left: 0,
// 		padding-left: 0,
// 	}
// }
