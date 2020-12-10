import React, { useState } from 'react';
// import { format, fromUnixTime } from 'date-fns';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import * as queries from '~core/queries';
import DeleteDataSetDialog from './DeleteDataSetDialog.component';
import styles from './DataSets.scss';
import { DataSet } from '~types/dataSets';

// {format(fromUnixTime(dataSet.dateCreated/1000), 'MMM d, y h:mm b')}
const Row = ({ onDelete, dataSet, i18n }: any): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.dataSetName}>{dataSet.dataSetName}</div>
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
	className: string;
	i18n: any;
};

const DataSets = ({ className, i18n }: DataSetsProps): JSX.Element | null => {
	const [selectedDataSet, selectDataSet] = useState<DataSet>();
	const [dialogVisible, setDeleteDialogVisibility] = useState(false);
	const { data } = useQuery(queries.GET_DATA_SETS);

	// TODO loading spinner
	const [deleteDataSet] = useMutation(queries.DELETE_DATA_SET, {
		refetchQueries: [
			{ query: queries.GET_DATA_SETS }
		],
		onCompleted: () => {
			setDeleteDialogVisibility(false);
		}
	});

	// show spinner here
	if (!data || !data.dataSets) {
		return null;
	}

	const onShowDeleteDialog = (dataSet: DataSet): void => {
		selectDataSet(dataSet);
		setDeleteDialogVisibility(true);
	};

	return (
		<>
			<section className={`${className} ${styles.page}`}>
				<div style={{ width: '100%' }}>
					<div className={`${styles.row} ${styles.header}`}>
						<div className={styles.dataSetName}>{i18n.dataSetName}</div>
						<div className={styles.lastModified}>{i18n.lastModified}</div>
						<div className={styles.numRowsGenerated}>{i18n.rowsGenerated}</div>
						<div className={styles.status}>Status</div>
						<div className={styles.load}>{i18n.load}</div>
						<div className={styles.history}>{i18n.history}</div>
						<div className={styles.del} />
					</div>
					<div className={styles.body}>
						{data.dataSets.map((dataSet: DataSet) => (
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
				onDelete={(): any => deleteDataSet({
					variables: {
						dataSetId: selectedDataSet!.dataSetId
					}
				})}
				i18n={i18n}
			/>
		</>
	);
};

export default DataSets;
