import { vars } from '@generatedata/core';
import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  header: {
    backgroundImage: 'url("./images/bg.png")',
    padding: '0 10px',
    height: '60px',
    display: 'flex',
    '& img': {
      userSelect: 'none'
    },
    '& section': {
      float: 'right'
    }
  },
  generatorControls: {
    flex: '1',
    overflow: 'hidden',
    paddingRight: '18px',
    opacity: '0',
    transition: 'opacity 200ms ease-in-out',
    '&.visible': {
      opacity: '1'
    }
  },
  mainLogo: {
    opacity: 0,
    position: 'absolute',
    left: '55px',
    top: '17px',
    transition: 'opacity 200ms ease-in-out',
    userSelect: 'none',

    '& img': {
      width: '200px'
    }
  },
  visible: {
    opacity: 1
  },
  headerLinks: {
    marginRight: '20px',
    animation: 'fadein 1s',
    '& li': {
      color: '#2e3d4e',
      fontSize: '13px',
      transition: 'color 0.1s ease-in-out',
      textDecoration: 'none',
      '& a:hover': {
        color: vars.primaryColor,
        textDecoration: 'none'
      },
      '&:hover': {
        color: vars.primaryColor,
        textDecoration: 'none'
      }
    },
    '& a': {
      color: '#2e3d4e',
      cursor: 'pointer',
      fontSize: '13px',
      transition: 'color 0.1s ease-in-out',
      textDecoration: 'none',
      '& a:hover': {
        color: vars.primaryColor,
        textDecoration: 'none'
      },
      '&:hover': {
        color: vars.primaryColor,
        textDecoration: 'none'
      }
    }
  },
  clickable: {
    cursor: 'pointer'
  },
  userAccount: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: '24px',
      height: '24px',
      borderRadius: '12px',
      marginRight: '6px'
    }
  },
  controls: {
    flex: '1',
    zIndex: '1',
    '& input': {
      color: '#222222',
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      transition: 'border 150ms ease-in-out',
      textOverflow: 'ellipsis',
      '&:hover': {
        border: '1px solid c.$primary-color',
        textOverflow: 'inherit'
      },
      '&:focus': {
        border: '1px solid c.$primary-color',
        textOverflow: 'inherit',
        color: '#000000'
      }
    }
  },
  title: {
    '& h5': {
      display: 'flex',
      alignItems: 'center',
      maxWidth: 'calc(100% - 40px)'
    }
  },
  flags: {
    backgroundImage: 'url("./images/flags.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '120px',
    flex: '1',
    width: '122px',
    height: '22px',
    display: 'inline-block',
    marginLeft: '15px',
    marginTop: '2px'
  },

  // div.selectedLocale
  selectedLocale: {
    backgroundColor: vars.primaryPaleBg,
    ':hover': {
      backgroundColor: vars.primaryPaleBg
    },
    '& span': {
      fontWeight: 'bold'
    }
  },
  selected: {
    '& a': {
      color: vars.primaryColor
    }
  },
  logoutLink: {
    marginRight: 0,
    '& button': {
      fontSize: '22px'
    },
    '& svg': {
      color: '#333333',
      '-webkit-mask-image': '-webkit-gradient(linear, left top, left bottom, from(black), to(rgba(0, 0, 0, 0.6)))'
    }
  },
  divider: {
    color: '#c0c0c3 !important',
    userSelect: 'none',
    cursor: 'inherit',
    ':hover': {
      color: '#c0c0c3'
    }
  },
  localeSelector: {
    marginRight: 0,
    '& button': {
      fontSize: '22px'
    },
    '& svg': {
      color: '#333333',
      '-webkit-mask-image': '-webkit-gradient(linear, left top, left bottom, from(black), to(rgba(0, 0, 0, 0.6)))'
    }
  },
  headerInner: {
    position: 'relative',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexFirection: 'row',
    alignItems: 'center'
  },
  headerLogo: {
    flex: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '4px 0',
    paddingRight: '10px'
  },
  nav: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',

    '& ul': {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      fontSize: '14px',

      '& li': {
        display: 'inline-block',
        margin: '0 10px',

        '&.current a': {
          color: '#000000'
        }
      }
    }
  },
  '& a': {
    textDecoration: 'none'
  }
});

// div ul {
// 	li.localeSelector {
// 		margin-right: 0;
// 		button {
// 			font-size: 22px;
// 		}
// 	}
// }

// @keyframes fadein {
// 	from {
// 		opacity: 0;
// 	}
// 	to {
// 		opacity: 1;
// 	}
// }
