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

// input,
// textarea,
// select {
// 	border-radius: 4px;
// 	border: 1px solid #cccccc;
// 	padding: 6px;
// 	outline: none;

// 	&:focus {
// 		border: 1px solid c.$field-focus-color;
// 	}
// }
