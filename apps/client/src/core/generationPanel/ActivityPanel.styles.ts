import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  generationRow: {
    fontSize: '14px',
    marginBottom: '10px',
    '& input': {
      width: '100px',
      margin: '0 6px',
      fontSize: '16px',
      color: '#666666'
    }
  },
  activityPanel: {
    width: '100%',
    height: '100%'
  },
  activityPanelSizer: {
    width: '800px',
    '@media screen and (max-width: 600px)': {
      width: '100%'
    }
  },
  panelWrapper: {
    display: 'flex',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  panel1: {
    flex: '0 1 250px',
    position: 'relative',
    padding: '10px',
    '@media screen and (max-width: 600px)': {
      display: 'flex'
    }
  },
  panel2: {
    flex: 1
    // '@media screen and (max-width: 600px)': { display: 'none' }
  },
  generateOverlay: {
    position: 'absolute',
    zIndex: 1,
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '10px',
    top: '50%',
    marginRight: '-50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  overlayWrapper: {
    position: 'relative',
    height: '100%'
  },
  background: {
    position: 'absolute',
    backgroundColor: '#efefef',
    opacity: 0.7,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  fadeOut: {
    opacity: 0,
    transition: 'opacity 0.25s ease-in-out'
  },
  counter: {
    color: '#275eb5',
    margin: '0 4px'
  },
  actionsRow: {
    height: '72px'
  },
  pie: {
    marginBottom: '10px',
    position: 'relative',

    '& h3': {
      position: 'absolute',
      color: '#666660',
      top: '50%',
      left: '50%',
      fontSize: '18px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1
    }
  },
  dataPanel: {
    padding: '0 5%'
  },
  dataRow: {
    display: 'flex',
    flexDirection: 'row',
    lineHeight: '38px',
    width: '100%'
  },
  dataRowLabel: {
    flex: '1 0 60%',
    color: '#888888',
    '@media screen and (max-width: 600px)': {
      flex: '1 0 80%'
    }
  },
  dataRowValue: {
    flex: '1 0 40%',
    fontSize: '16px'
  },
  generationOverlayBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.9,
    width: '100%',
    margin: '0 -20px'
  },
  generationOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    margin: '0 -20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  generationSettingsContent: {
    position: 'relative'
  },
  generationLabel: {
    fontSize: '14px'
  },
  generationComplete: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    margin: '0 -20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '18px',

    '& svg': {
      fontSize: '42px',
      fill: '#11811b'
    }
  }
});
