import { makeStyles, makeStaticStyles } from '@griffel/react';

export const useClasses = makeStyles({
  controlRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '6px 10px',
    justifyContent: 'flex-end'
  }
});

export const useGlobalStyles = makeStaticStyles({
  '.split-pane-divider': {
    backgroundImage: 'url("./images/bg.png")',
    padding: '3px'
  }
});

// :global(.Pane2) {
// 	max-width: 100%;
// 	overflow: hidden;
// }

// :global(.Resizer) {
// 	z-index: 1;
// 	box-sizing: border-box;
// 	background-clip: padding-box;

// 	&:global(.horizontal) {
// 		flex: 0 0 auto;
// 		height: 5px;
// 		margin: 0;
// 		cursor: row-resize;
// 		width: 100%;

// 		&:hover {
// 			background-image: none;
// 			background-color: #dddddd;
// 		}
// 	}

// 	&:global(.vertical) {
// 		width: 5px;
// 		margin: 0;
// 		cursor: col-resize;

// 		&:hover {
// 			background-image: none;
// 			background-color: #dddddd;
// 		}
// 	}

// 	&:hover(.disabled) {
// 		cursor: not-allowed;
// 	}
// }

// .split-pane {
//   height: 100vh;
// }

// .split-pane-divider {
//   background: #e0e0e0;
//   transition: background 0.2s;
// }

// .split-pane-divider:hover {
//   background: #b0b0b0;
// }

// .split-pane-divider:focus {
//   outline: 2px solid #2196f3;
//   outline-offset: -2px;
// }
