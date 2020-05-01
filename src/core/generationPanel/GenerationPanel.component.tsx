import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../components/dialogs';
import styles from './GenerationPanel.scss';

// const dialogStyles = (theme: any): any => ({
// 	root: {
// 		margin: 0,
// 		padding: theme.spacing(2)
// 	},
// 	closeButton: {
// 		position: 'absolute',
// 		right: theme.spacing(1),
// 		top: 6,
// 		color: theme.palette.grey[500]
// 	}
// });
//
// // @ts-ignore-line
// const DialogTitle = withStyles(dialogStyles)((props: any): React.ReactNode => {
// 	const { children, classes, onClose, ...other } = props;
// 	return (
// 		<MuiDialogTitle disableTypography className={classes.root} {...other}>
// 			<Typography variant="h5">{children}</Typography>
// 			{onClose ? (
// 				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
// 					<CloseIcon fontSize="large" />
// 				</IconButton>
// 			) : null}
// 		</MuiDialogTitle>
// 	);
// });
//
// const DialogContent = withStyles(theme => ({
// 	root: {
// 		padding: theme.spacing(2)
// 	}
// }))(MuiDialogContent);
//
// const DialogActions = withStyles(theme => ({
// 	root: {
// 		margin: 0,
// 		padding: theme.spacing(1)
// 	}
// }))(MuiDialogActions);
//
// // @ts-ignore-line
// const Dialog = withStyles(() => ({
// 	root: {
// 		zIndex: '5000 !important',
// 		width: '100%'
// 	},
// 	paper: {
// 		maxWidth: 500,
// 		width: '100%'
// 	}
// }))(MuiDialog);


export type GenerationPanelProps = {
	visible: boolean;
	onChangeNumGenerationRows: (numRows: number) => void;
	onClose: () => void;
	onGenerate: () => void;
	numGenerationRows: number;
	i18n: any;
	stripWhitespace: boolean;
	onToggleStripWhitespace: () => void;
};

const GenerationPanel = ({ visible, onClose, i18n, stripWhitespace, numGenerationRows,
	onChangeNumGenerationRows, onGenerate }: GenerationPanelProps): JSX.Element => {
	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogTitle onClose={onClose}>{i18n.generate}</DialogTitle>
			<DialogContent dividers>
				<div className={styles.intro}>
					Finished building your data set? Great! Time to generate the data. Please note that
					depending on the size of your data and the number of rows, this may take some time to complete.
				</div>

				<div className={styles.row}>
					Generate
					<input
						type="number"
						value={numGenerationRows}
						onChange={(e: any) => onChangeNumGenerationRows(e.target.value)}
					/> rows
				</div>

				<div className={styles.row}>
					<input type="checkbox" id="stripWhitespace" checked={stripWhitespace} />
					<label htmlFor="stripWhitespace">strip whitespace from generated content</label>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onGenerate} color="primary" variant="outlined">Generate</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GenerationPanel;
