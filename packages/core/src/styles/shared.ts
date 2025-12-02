import { makeStyles } from '@griffel/react';
import { error, primaryColor } from './variables';

export const useSharedClasses = makeStyles({
  tip: {
    color: '#999999'
  },

  emptyCol: {
    padding: '7px 2px',
    color: '#999999'
  },

  blank: {
    color: '#cccccc'
  },

  emptyText: {
    color: '#666666',
    fontStyle: 'italic'
  },

  errorField: {
    // input, select, button
    border: `1px solid ${error}`,
    ':focus': {
      border: `1px solid ${error}`
    }
  },
  pill: {
    backgroundColor: '#dfecfc',
    borderRadius: '3px',
    padding: '1px 6px'
  },
  copyCol: {
    flex: '0 0 26px'
  },

  tab: {
    flex: '1',
    padding: '20px 0',
    overflow: 'scroll'
  },

  twoColPage: {
    maxWidth: '1024px',
    margin: '15px auto 0',
    width: '100%',
    padding: '0 10px',
    height: '100%',
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',

    '& input': {
      fontSize: '14px'
    }
  },

  selected: {
    color: primaryColor
  },

  fadeIn: {
    opacity: 0,
    transition: 'opacity 200ms ease-in-out'
  },

  hidden: {
    visibility: 'hidden'
  },

  cancelLink: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#999999',
    cursor: 'pointer',
    transition: 'visibility 200ms ease-in-out',

    '&:hover': {
      color: primaryColor
    },

    '&.hidden': {
      visibility: 'hidden'
    }
  }
});

// :global(div.MuiAlert-root) {
// 	font-size: 13px;
// }

// 	nav {
// 		flex: 0 0 240px;

// 		ul {
// 			list-style: none;
// 			padding-left: 0;

// 			li {
// 				padding: 10px 10px;
// 				font-size: 14px;
// 				cursor: pointer;
// 				transition: color 0.2s ease-in-out;

// 				&:hover {
// 					color: c.$primary-color;
// 				}
// 			}
// 		}
// 	}

// 	label {
// 		color: #999999;
// 	}

// 	:global(.react-select__placeholder),
// 	:global(.react-select__single-value) {
// 		font-size: 14px;
// 	}
// }

// @media (max-width: 600px) {
// 	.twoColPage {
// 		flex-direction: column;

// 		nav {
// 			flex: 0 0 auto;
// 			border-bottom: 1px solid #efefef;
// 		}
// 	}
// }
