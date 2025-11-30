import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  dateRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4px',

    '& label': {
      marginRight: '6px'
    },
    '& span': {
      textTransform: 'none'
    }
  },
  formatCodeLabel: {
    marginRight: '4px'
  },

  dateField: {
    margin: 0,
    '& div input': {
      border: 0
    },
    '& > div': {
      borderBottom: 0
    }
  },
  dateBtn: {
    backgroundColor: '#ffffff',
    padding: '4px 6px'
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '12px',

    // 	.col1 {
    // 		flex: 0 0 70px;
    // 	}
    // 	.col2 {
    // 		flex: 1;
    // 	}
    // 	.col3 {
    // 		flex: 1;
    // 		color: #999999;
    // 	}

    '& label': {
      backgroundColor: '#dfecfc',
      borderRadius: '3px',
      padding: '1px 6px'
    }
  },
  col1: {
    flex: '0 0 70px'
  },
  col2: {
    flex: 1
  },
  col3: {
    flex: 1,
    color: '#999999'
  },
  copy: {
    margin: '4px 0 0 4px'
  }
});
