import { makeStaticStyles } from '@griffel/react';
import { primaryColor } from './variables';

export const useGlobalStyles = makeStaticStyles({
  h3: {
    margin: '10px 0 8px'
  },

  a: {
    textDecoration: 'none',
    color: primaryColor,

    '&:hover': {
      textDecoration: 'underline'
    }
  },

  '.Select-menu-outer': {
    zIndex: '10000 !important'
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
