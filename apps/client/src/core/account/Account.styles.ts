import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  hidden: {
    opacity: 0
  },
  shown: {
    opacity: 1,
    transition: 'opacity 200ms ease-in-out'
  },
  yourAccountPage: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
    '& > *': {
      flex: 1
    }
  },
  rightCol: {
    borderLeft: '1px solid #f2f2f2',
    paddingLeft: '20px',
    height: '83%'
  },
  rightBlock: {
    '& > div': {
      marginBottom: '15px',
      fontSize: '32px'
    }
  },
  yourAccountRightCol: {
    flex: 1,
    marginLeft: '20px'
  }
});

// @media (max-width: 720px) {
//   .yourAccountRightCol {
//     display: none;
//   }
// }
