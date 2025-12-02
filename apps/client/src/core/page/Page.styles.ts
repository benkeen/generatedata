import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  page: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  content: {
    flex: 1,
    overflow: 'hidden'
  }
});

// :global(.page-home) .page {
// 	display: inherit;

// 	header {
// 		position: fixed;
// 		width: 100%;
// 		z-index: 2;
// 	}

// 	.content {
// 		padding-top: 60px;
// 	}
// }
