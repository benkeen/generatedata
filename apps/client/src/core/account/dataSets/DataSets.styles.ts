import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  page: {
    fontSize: '13px',
    maxWidth: '1024px',
    margin: '0 auto 0',
    width: '100%',
    '& h2': {
      marginTop: 0
    }
  },
  table: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  paginationRow: {
    margin: '15px 0'
  },
  row: {
    display: 'flex',
    width: '100%',
    padding: '6px',
    alignItems: 'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#666666',
    paddingTop: '2px',
    borderBottom: '1px solid #333333'
  },
  bodySection: {
    overflow: 'scroll'

    // .row {
    //   &:hover {
    //     background-color: #f9f9f9;
    //   }
    // }
  },
  dataSetName: {
    flex: 1
  },
  dateCreated: {
    flex: 1
  },
  lastModified: {
    flex: 1
  },
  numRowsGenerated: {
    flex: 1,
    color: '#666666'
  },
  status: {
    flex: '0 0 80px'
  },
  open: {
    flex: '0 0 80px',
    textAlign: 'center'
  },
  history: {
    flex: '0 0 80px',
    textAlign: 'center'
  },
  del: {
    flex: '0 0 30px',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      '& svg': {
        fill: '#990000'
      }
    }
  }
});

// @media (max-width: 720px) {
//   .status,
//   .lastModified,
//   .numRowsGenerated {
//     display: none;
//   }
// }
