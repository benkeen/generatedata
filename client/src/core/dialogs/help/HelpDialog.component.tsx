import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { DropdownOption } from '~components/dropdown/Dropdown';
import { MediumSpinner } from '~components/loaders/loaders';
import { getSortedGroupedDataTypes, getDataType } from '~utils/dataTypeUtils';
import styles from './HelpDialog.scss';
import { DataTypeFolder } from '../../../../_plugins';

export type HelpDialogProps = {
	visible: boolean;
	initialDataType: DataTypeFolder | null;
	loadedDataTypes: any; // done on purpose. This ensures it repaints after a new DT is loaded
	onClose: any;
	coreI18n: any;
	dataTypeI18n: any;
	onSelectDataType: (dataType: DataTypeFolder) => void;
};

const DataTypeList = ({ onSelect, filterString }: any): any => {
	const dataTypes = getSortedGroupedDataTypes();
	const regex = new RegExp(filterString, 'i');
	const content: any = [];

	dataTypes.forEach(({ label, options }: { label: string; options: any }) => {
		let list: any = options;
		if (filterString.trim() !== '') {
			list = list.filter(({ value, label }: DropdownOption) => regex.test(value) || regex.test(label));
		}
		list = list.map(({ value, label }: DropdownOption) => (
			<li key={value} onClick={(): void => onSelect(value)}>{label}</li>
		));

		if (list.length) {
			content.push(
				<div key={label}>
					<h3>{label}</h3>
					<ul>{list}</ul>
				</div>
			);
		}
	});

	return content;
};

const HelpDialog = ({ visible, initialDataType, onClose, coreI18n, dataTypeI18n, onSelectDataType }: HelpDialogProps): JSX.Element => {
	const [dataType, setDataType] = useState<DataTypeFolder | null>(null);
	const [filterString, setFilterString] = useState('');

	const selectDataType = (dataType: DataTypeFolder): void => {
		onSelectDataType(dataType);
		setDataType(dataType);
	};

	React.useEffect(() => {
		setDataType(initialDataType);
	}, [initialDataType]);

	const i18n = dataType ? dataTypeI18n[dataType] : {};
	const { Help } = getDataType(dataType);

	let spinnerStyles = styles.spinner;
	if (Help) {
		spinnerStyles += ` ${styles.fadeOut}`;
	}

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="customized-dialog-title"
			open={visible}
			className={styles.helpDialog}
			TransitionProps={{
				onExited: (): void => {
					setFilterString('');
				}
			}}>
			<div className={`${styles.dialog} tour-helpDialog`}>
				<DialogTitle onClose={onClose}>{i18n.NAME}</DialogTitle>
				<DialogContent dividers className={styles.contentPanel}>
					<div className={styles.dataTypeList}>
						<input
							type="text"
							placeholder={coreI18n.filterDataTypes}
							autoFocus
							value={filterString}
							onChange={(e): void => setFilterString(e.target.value)}
						/>
						<div className={styles.list}>
							<DataTypeList
								filterString={filterString}
								onSelect={selectDataType}
							/>
						</div>
					</div>
					<div className={styles.helpContent}>
						{Help ? <Help
							coreI18n={coreI18n}
							i18n={i18n}
						/> : null}
						<MediumSpinner className={spinnerStyles} />
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">
						{coreI18n.close}
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default HelpDialog;
