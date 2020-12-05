import React, { useEffect, useState } from 'react';
import { format, fromUnixTime } from 'date-fns';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteDataSetDialog from './DeleteDataSetDialog.component';
import * as styles from './DataSets.scss';
import { DataSet } from '~types/dataSets';

export type DataSetsProps = {
	i18n: any;
	onInit: () => void;
	onDelete: (dataSetId: number) => void;
	dataSets: any;
};

const Row = ({ onDelete, dataSetName, dateCreated, numRowsGenerated }: any): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.dataSetName}>{dataSetName}</div>
			<div className={styles.dateCreated}>{format(fromUnixTime(dateCreated/1000), 'MMM d, y h:mm b')}</div>
			<div className={styles.lastModified}></div>
			<div className={styles.numRowsGenerated}>{numRowsGenerated}</div>
			<div className={styles.status}></div>
			<div className={styles.history}>
				<Button size="small" type="submit" color="secondary" variant="outlined">Load</Button>
			</div>
			<div className={styles.history}>
				<Button size="small" type="submit" color="primary" variant="outlined">History</Button>
			</div>
			<div className={styles.del} onClick={onDelete}>
				<HighlightOffIcon />
			</div>
		</div>
	);
};


const DataSets = ({ onInit, onDelete, dataSets, i18n }: DataSetsProps): JSX.Element | null => {
	const [selectedDataSet, selectDataSet] = useState<DataSet>();
	const [dialogVisible, setDeleteDialogVisibility] = useState(false);

	useEffect(() => {
		onInit();
	}, []);

	if (!dataSets || !dataSets.length) {
		return null;
	}

	const onShowDeleteDialog = (dataSet: DataSet) => {
		selectDataSet(dataSet);
		setDeleteDialogVisibility(true);
	};

	return (
		<>
			<section className={`${styles.page}`}>
				<div style={{ width: '100%' }}>
					<div className={`${styles.row} ${styles.header}`}>
						<div className={styles.dataSetName}>Data set name</div>
						<div className={styles.dateCreated}>Date created</div>
						<div className={styles.lastModified}>Last modified</div>
						<div className={styles.numRowsGenerated}>Rows generated</div>
						<div className={styles.status}>Public</div>
						<div className={styles.history}>Load</div>
						<div className={styles.history}>History</div>
						<div className={styles.del} />
					</div>
					<div className={styles.body}>
						{dataSets.map((dataSet: DataSet, index: number) => (
							<Row
								key={index}
								{...dataSet}
								onDelete={(): void => onShowDeleteDialog(dataSet)}
							/>
						))}
					</div>
				</div>
			</section>

			<DeleteDataSetDialog
				visible={dialogVisible}
				dataSetName={selectedDataSet!.dataSetName}
				onClose={(): void => setDeleteDialogVisibility(false)}
				i18n={i18n}
			/>
		</>
	);
};

export default DataSets;
