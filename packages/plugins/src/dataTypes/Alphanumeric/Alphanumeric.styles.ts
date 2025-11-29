import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '12px'
  },
  col1: {
    flex: '0 0 30px'
  },
  col2: {
    flex: 1
  },
  col3: {
    flex: '0 0 30px'
  },
  col4: {
    flex: 1
  },
  copy: {
    margin: '4px 0 0 4px'
  }
});

// .row {
// 	display: flex;
// 	align-items: flex-start;
// 	padding-bottom: 12px;

// 	.col1 {
// 		flex: 0 0 30px;
// 	}
// 	.col2 {
// 		flex: 1;
// 	}
// 	.col3 {
// 		flex: 0 0 30px;
// 	}
// 	.col4 {
// 		flex: 1;
// 	}
// }

// .copy {
// 	margin: 4px 0 0 4px;
// }
