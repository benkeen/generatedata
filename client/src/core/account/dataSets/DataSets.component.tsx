import React, { useEffect, useState } from 'react';
import { format, fromUnixTime } from 'date-fns';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteDataSetDialog from './DeleteDataSetDialog.component';
import * as styles from './DataSets.scss';
import { DataSet } from '~types/dataSets';

const Row = ({ onDelete, dataSet, i18n }: any): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.dataSetName}>{dataSet.dataSetName}</div>
			<div className={styles.dateCreated}>{format(fromUnixTime(dataSet.dateCreated/1000), 'MMM d, y h:mm b')}</div>
			<div className={styles.lastModified}></div>
			<div className={styles.numRowsGenerated}>{dataSet.numRowsGenerated}</div>
			<div className={styles.status}>
				{dataSet.status === 'public' ? 'Public' : 'Private'}
			</div>
			<div className={styles.load}>
				<Button size="small" type="submit" color="secondary" variant="outlined">{i18n.load}</Button>
			</div>
			<div className={styles.history}>
				<Button size="small" type="submit" color="primary" variant="outlined">{i18n.history}</Button>
			</div>
			<div className={styles.del} onClick={onDelete}>
				<HighlightOffIcon />
			</div>
		</div>
	);
};

export type DataSetsProps = {
	i18n: any;
	onInit: () => void;
	onDelete: (dataSetId: number) => void;
	dataSets: any;
};

const DataSets = ({ onInit, onDelete, dataSets, i18n }: DataSetsProps): JSX.Element | null => {
	const [selectedDataSet, selectDataSet] = useState<DataSet>();
	const [dialogVisible, setDeleteDialogVisibility] = useState(false);

	console.log(dataSets);

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
						<div className={styles.dataSetName}>{i18n.dataSetName}</div>
						<div className={styles.dateCreated}>{i18n.dateCreated}</div>
						<div className={styles.lastModified}>{i18n.lastModified}</div>
						<div className={styles.numRowsGenerated}>{i18n.rowsGenerated}</div>
						<div className={styles.status}>{i18n.publicQ}</div>
						<div className={styles.load}>{i18n.load}</div>
						<div className={styles.history}>{i18n.history}</div>
						<div className={styles.del} />
					</div>
					<div className={styles.body}>
						{dataSets.map((dataSet: DataSet, index: number) => (
							<Row
								key={dataSet.dataSetId}
								dataSet={dataSet}
								onDelete={(): void => onShowDeleteDialog(dataSet)}
								i18n={i18n}
							/>
						))}
					</div>
				</div>
			</section>

			<DeleteDataSetDialog
				visible={dialogVisible}
				dataSetName={selectedDataSet ? selectedDataSet.dataSetName : null}
				onClose={(): void => setDeleteDialogVisibility(false)}
				onDelete={() => onDelete(selectedDataSet!.dataSetId)}
				i18n={i18n}
			/>
		</>
	);
};

export default DataSets;
