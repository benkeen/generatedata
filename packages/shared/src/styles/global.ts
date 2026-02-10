import { makeStaticStyles } from '@griffel/react';
import { primaryColor } from './variables';

export const useGlobalStyles = makeStaticStyles({
  '*': {
    boxSizing: 'border-box'
  },
  html: {
    height: '100%',
    padding: 0,
    margin: 0,
    fontFamily: '"Open Sans", serif',
    fontSize: '12px'
  },
  body: {
    height: '100%',
    padding: 0,
    margin: 0,
    fontFamily: '"Open Sans", serif',
    fontSize: '12px'
  },
  input: {
    fontFamily: '"Open Sans", serif',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    padding: '6px',
    outline: 'none'
  },
  select: {
    fontFamily: '"Open Sans", serif',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    padding: '6px',
    outline: 'none'
  },
  textarea: {
    fontFamily: '"Open Sans", serif',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    padding: '6px',
    outline: 'none'
  },
  a: {
    textDecoration: 'none',
    color: primaryColor,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  h3: {
    margin: '10px 0 8px'
  },
  '.Select-menu-outer': {
    zIndex: '10000 !important'
  },

  '.MuiButtonBase-root': {
    color: '#000000de',

    '& svg': {
      marginLeft: '-4px',
      marginRight: '6px'
    }
  },
  '.gdToastContainer': {
    zIndex: 5006
  },
  '.gdToast div': {
    fontSize: '13px'
  },
  '.gdToast svg': {
    fill: 'white'
  }

  // body div.MuiTooltip-popper) {
  //   z-index: 5005 !important; // was 5010
  // }

  // .recharts-wrapper .recharts-area {
  //   transition: none;
  // }

  // body :global(.MuiAlert-filledError) {
  //   background-color: #c52820;
  // }

  // ul:global(.MuiPagination-ul) li {
  //   padding: 0 !important;
  // }
});
