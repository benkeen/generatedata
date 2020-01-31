// import * as React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';


// export type HelpDialogProps = {
// 	initialDataType: string;
// 	visible: boolean;
// 	onClose: any;
// 	coreI18n: any;
// 	i18n: any;
// }

// const CountryDialog = ({ initialDataType, visible, onClose, coreI18n }: HelpDialogProps): JSX.Element => {
// 	const [dataType, setDataType] = React.useState();

// 	React.useEffect(() => {
// 		setDataType(initialDataType);
// 	}, [initialDataType]);

// 	return (
// 		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
// 			<MuiDialogTitle onClose={onClose}>
// 				{coreI18n.help}
// 			</MuiDialogTitle>
// 			<MuiDialogContent dividers>
// 				<Dropdown
// 					isGrouped={true}
					
// 					value={dataType}
// 					onChange={(i: any): void => setDataType(i.value)}
// 					options={dataTypes}
// 				/>
// 			</MuiDialogContent>
// 			<MuiDialogActions>
// 				<Button autoFocus onClick={onClose} color="primary">
// 					Close
// 				</Button>
// 			</MuiDialogActions>
// 		</Dialog>
// 	);
// };

// export default CountryDialog;
