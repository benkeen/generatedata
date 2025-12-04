import { vars } from '@generatedata/core';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  showTourLink: {
    flex: '0 0 auto'
  },
  activePacketsList: {
    flex: '1 1 auto',
    overflow: 'scroll'
  },
  footerControls: {
    display: 'flex',
    alignItems: 'stretch',
    flex: '0 0 auto',
    paddingRight: '18px',
    opacity: 0,
    transition: 'opacity 200ms ease-in-out'
    // &.visible {
    // 	opacity: 1;
    // }
  },
  visible: {
    opacity: 1
  },
  footer: {
    flex: '0 0 60px',
    backgroundImage: 'url("./images/bg.png")',
    padding: '16px 20px',

    '& > div': {
      display: 'flex',
      flex: '0 0 auto',
      margin: '0 auto',
      alignContent: 'space-between',
      maxWidth: '1400px',
      height: '32px',

      '& > ul': {
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        alignItems: 'center',
        '& li': {
          display: 'flex',
          marginRight: '10px',

          '&:hover svg': {
            fill: vars.primaryColor
          }
        },
        '& svg': {
          cursor: 'pointer',
          transition: 'fill 0.15s ease-in-out'
        }
      }
    },

    '& a:hover': {
      borderBottom: 0
    }

    // 	svg {
    // 		-webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(black), to(rgba(0, 0, 0, 0.6)));
    // 	}

    // 	button.generateButton,
    // 	button.saveButton,
    // 	button.saveButtonAsMainBtn {
    // 		font-size: 13px;

    // 		svg {
    // 			font-size: 15px;
    // 			margin: 0 5px 0 -5px;
    // 		}

    // 		&:global(.Mui-disabled) {
    // 			border-color: #bbbbbb;
    // 		}
    // 	}
    // .aboutIconEl {
    // 	height: 24px;
    // }
  },
  generateButton: {
    fontSize: '13px',
    '& svg': {
      fontSize: '15px',
      margin: '0 5px 0 -5px'
    }
    // &:global(.Mui-disabled) {
    //   border-color: #bbbbbb;
    // }
  },
  saveButton: {
    // ':global(div)',
    fontSize: '13px',
    backgroundColor: vars.primarySubmit,
    color: 'white',
    marginRight: '15px',
    ':hover': {
      backgroundColor: vars.primarySubmitHover
    },
    '& svg': {
      fontSize: '15px',
      margin: '0 5px 0 -5px'
    }
    // &:global(.Mui-disabled) {
    //   border-color: #bbbbbb;
    // }
  },
  saveButtonAs: {
    // button.saveButtonAsMainBtn {
    // 	border-color: #bde9fb;
    // }
  },

  saveButtonAsMainBtn: {
    fontSize: '13px',
    '& svg': {
      fontSize: '15px',
      margin: '0 5px 0 -5px'
    }
    // &:global(.Mui-disabled) {
    //   border-color: #bbbbbb;
    // }
  },
  aboutIconEl: {
    height: '24px'
  },
  scriptVersion: {
    '& a': {
      marginRight: '30px',
      color: '#333333',

      ':hover': {
        textDecoration: 'none'
      }
    }
  },
  controls: {
    // div.controls
    marginRight: '15px'
  },
  // div.saveButtonAs: {
  //   height: '32px',
  //   marginRight: '15px',
  //   '& button': {
  //     backgroundColor: vars.primarySubmit,
  //     color: 'white',

  //     ':hover': {
  //       backgroundColor: vars.primarySubmitHover
  //     }
  //   }
  // },
  saveBtnArrow: {
    // button.saveBtnArrow
    minWidth: 'inherit',
    padding: '0 6px',
    '& svg': {
      margin: 0
    }
  },
  saveAsRow: {
    cursor: 'pointer',
    backgroundColor: vars.primarySubmit,
    marginBottom: '2px',
    borderRadius: '2px',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '11px',
    padding: '6px 12px',
    zIndex: 2,
    ':hover': {
      backgroundColor: vars.primarySubmitHover
    }
  },
  tourBtn: {
    textTransform: 'none',
    transition: 'color 0.15s ease-in-out',
    marginLeft: '-6px',

    '& svg': {
      marginRight: '4px'
    },
    '&:hover': {
      color: vars.primaryColor
    }
  }
});

// .tourBtn:global(.MuiButtonBase-root) {
// }

// @media (max-width: 900px) {
// 	button.tourBtn {
// 		display: none;
// 	}
// }

// @media (max-width: 600px) {
// 	.footerControls {
// 		padding-right: 0;
// 	}
// }
