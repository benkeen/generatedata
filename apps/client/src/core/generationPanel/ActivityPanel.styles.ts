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
  panel1: {
    flex: 1,
    position: 'relative',
    padding: '10px'
  },
  panel2: {
    flex: 1
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
  }

  // .overlayWrapper {
  // 	position: relative;
  // 	height: 100%;
  // }

  // .background {
  // 	position: absolute;
  // 	background-color: #efefef;
  // 	opacity: 0.7;
  // 	top: 0;
  // 	left: 0;
  // 	bottom: 0;
  // 	right: 0;
  // }

  // .fadeOut {
  // 	opacity: 0;
  // 	transition: opacity 0.25s ease-in-out;
  // }

  // .counter {
  // 	color: #275eb5;
  // 	margin: 0 4px;
  // }

  // .actionsRow {
  // 	height: 72px;
  // }

  // .activityPanel :global(.MuiDialog-paper) {
  // 	width: 100%;
  // 	max-width: 1000px;
  // 	height: 100%;
  // 	max-height: 600px;
  // }

  // .pie {
  // 	margin-bottom: 20px;
  // 	position: relative;

  // 	h3 {
  // 		position: absolute;
  // 		color: #666660;
  // 		top: 50%;
  // 		left: 50%;
  // 		font-size: 18px;
  // 		margin-right: -50%;
  // 		transform: translate(-50%, -50%);
  // 		z-index: 1;
  // 	}
  // }

  // .dataPanel {
  // 	padding: 0 5%;
  // }

  // .dataRow {
  // 	display: flex;
  // 	flex-direction: row;
  // 	line-height: 42px;
  // 	width: 100%;
  // }

  // .dataRowLabel {
  // 	flex: 1 0 60%;
  // }

  // .dataRowValue {
  // 	flex: 1 0 40%;
  // 	font-size: 16px;
  // }

  // .generationOverlayBg {
  // 	position: absolute;
  // 	top: 0;
  // 	bottom: 0;
  // 	background-color: white;
  // 	opacity: 0.9;
  // 	width: 100%;
  // 	margin: 0 -20px;
  // }

  // .generationOverlay {
  // 	position: absolute;
  // 	top: 0;
  // 	bottom: 0;
  // 	width: 100%;
  // 	margin: 0 -20px;
  // 	display: flex;
  // 	align-items: center;
  // 	justify-content: center;
  // 	flex-direction: column;
  // }

  // .generationSettingsContent {
  // 	position: relative;
  // }

  // .generationLabel {
  // 	font-size: 14px;
  // }

  // .generationComplete {
  // 	position: absolute;
  // 	top: 0;
  // 	bottom: 0;
  // 	width: 100%;
  // 	margin: 0 -20px;
  // 	display: flex;
  // 	align-items: center;
  // 	justify-content: center;
  // 	flex-direction: column;
  // 	font-size: 18px;

  // 	svg {
  // 		font-size: 42px;
  // 		fill: #11811b;
  // 	}
  // }
});
