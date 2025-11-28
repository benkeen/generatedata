import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  page: {
    fontSize: '13px'
  },
  paginationRow: {
    margin: '15px 0'
  },
  searchFilter: {
    display: 'flex',
    marginRight: '8px'
  },
  accountsFilter: {
    width: '130px'
  },
  accountsListTable: {
    width: '100%',
    marginBottom: '20px'
  },
  firstName: {
    flex: '1 0 110px'
  },
  lastName: {
    flex: '1 0 110px'
  },
  expiryDate: {
    flex: '1 0 90px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  lastLoggedIn: {
    flex: '1 0 90px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  status: {
    flex: '1 0 70px'
  },
  edit: {
    flex: '0 0 90px',
    textAlign: 'center'
  },
  del: {
    flex: '0 0 30px',
    alignItems: 'center',
    cursor: 'pointer',
    ':hover': {
      '& svg': {
        fill: '#990000'
      }
    }
  },
  tableBody: {
    overflow: 'scroll'

    // .row {
    // 	&:hover {
    // 		background-color: #f9f9f9;
    // 	}
    // }
  },
  row: {
    '&:hover': {
      backgroundColor: '#f9f9f9'
    }
  },
  filtersRow: {
    display: 'flex',
    marginBottom: '15px',
    alignItems: 'center',

    '& h4': {
      marginLeft: 'auto'
    }
  }
});

// 	.row {
// 		display: flex;
// 		width: 100%;
// 		padding: 6px;
// 		align-items: center;
// 		font-size: 13px;
// 	}
// }

// @media (max-width: 720px) {
// 	.status,
// 	.lastLoggedIn,
// 	.expiryDate {
// 		display: none;
// 	}

// 	.paginationRow nav {
// 		border-bottom: 0;
// 	}
// }

// @media (max-width: 900px) {
// 	.lastLoggedIn {
// 		display: none;
// 	}
// }
