import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Pagination from '~components/Pagination';
import TableHeader, {
	ColSortDir
} from '~components/tables/TableHeader.component';
import * as queries from '~core/queries';
import DeleteDataSetDialog from '~core/dialogs/deleteDataSet/DeleteDataSetDialog.component';
import styles from './DataSets.scss';
import * as sharedStyles from '../../../styles/shared.scss';
import { DataSetListItem } from '~types/dataSets';
import { formatUnixTime } from '~utils/dateUtils';
import { getGeneratorPageRoute } from '~utils/routeUtils';
import { useHistory } from 'react-router';
import { getFormattedNum } from '~utils/numberUtils';
import { GDLocale } from '~types/general';

const Row = ({ onDelete, onLoad, dataSet, i18n }: any): JSX.Element => (
	<div className={styles.row}>
		<div className={styles.dataSetName}>{dataSet.dataSetName}</div>
		<div className={styles.dateCreated}>
			{formatUnixTime(dataSet.historyDateCreatedUnix)}
		</div>
		<div className={styles.numRowsGenerated}>
			{getFormattedNum(dataSet.numRowsGenerated)}
		</div>
		<div className={styles.open}>
			<Button
				size="small"
				type="submit"
				color="primary"
				variant="outlined"
				onClick={onLoad}
			>
				{i18n.open}
			</Button>
		</div>
		<div className={styles.del} onClick={onDelete}>
			<HighlightOffIcon />
		</div>
	</div>
);

export type DataSetsProps = {
	locale: GDLocale;
	onLoadDataSet: (dataSet: DataSetListItem) => void;
	onClearCurrentDataSet: () => void;
	currentDataSetId: number | null;
	className: string;
	i18n: any;
};

// to be moved to a user setting at some point
const NUM_PER_PAGE = 10;

const DataSets = ({
	onLoadDataSet,
	locale,
	i18n,
	currentDataSetId,
	className = '',
	onClearCurrentDataSet
}: DataSetsProps): JSX.Element | null => {
	const history = useHistory();
	const [selectedDataSet, selectDataSet] = useState<DataSetListItem>();
	const [currentPage, setCurrentPage] = useState(1);
	const [dialogVisible, setDeleteDialogVisibility] = useState(false);
	const [sortCol, setSortCol] = useState('dataSetName');
	const [sortDir, setSortDir] = useState<ColSortDir>(ColSortDir.asc);

	const { data } = useQuery(queries.GET_DATA_SETS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			offset: (currentPage - 1) * NUM_PER_PAGE,
			limit: NUM_PER_PAGE,
			sortDir,
			sortCol
		}
	});

	const loadDataSet = (dataSet: DataSetListItem): void => {
		onLoadDataSet(dataSet);
		history.push(getGeneratorPageRoute(locale));
	};

	const numItemsOnPage = data?.dataSets?.results?.length || 0;
	const afterDeletePage = numItemsOnPage === 1 ? currentPage - 1 : currentPage;
	let offset = (afterDeletePage - 1) * NUM_PER_PAGE;
	offset = offset < 0 ? 0 : offset;

	const [deleteDataSet] = useMutation(queries.DELETE_DATA_SET, {
		refetchQueries: [
			{
				query: queries.GET_DATA_SETS,
				variables: {
					offset,
					limit: NUM_PER_PAGE,
					sortDir,
					sortCol
				}
			}
		],
		onCompleted: () => {
			setDeleteDialogVisibility(false);

			if (currentDataSetId) {
				const { dataSetId: deletedDataSetId } =
					selectedDataSet as DataSetListItem;

				// double == intentional. Maybe a string
				if (currentDataSetId == deletedDataSetId) {
					onClearCurrentDataSet();
				}
			}
		}
	});

	// show spinner here
	if (!data || !data.dataSets) {
		return null;
	}

	const onShowDeleteDialog = (dataSet: DataSetListItem): void => {
		selectDataSet(dataSet);
		setDeleteDialogVisibility(true);
	};

	const { results, totalCount } = data.dataSets;

	if (totalCount === 0) {
		return (
			<section className={`${className} ${styles.page}`}>
				<div className={sharedStyles.emptyText}>{i18n.noDataSetsSaved}</div>
			</section>
		);
	}

	const paginationRow =
		totalCount > NUM_PER_PAGE ? (
			<div className={styles.paginationRow}>
				<Pagination
					numPages={Math.ceil(totalCount / NUM_PER_PAGE)}
					currentPage={currentPage}
					onChange={(e: any, pageNum: number): void => setCurrentPage(pageNum)}
				/>
			</div>
		) : null;

	const cols = [
		{
			label: i18n.dataSetName,
			className: styles.dataSetName,
			field: 'dataSetName',
			sortable: true
		},
		{
			label: i18n.lastModified,
			className: styles.lastModified,
			field: 'lastUpdated',
			sortable: true
		},
		{
			label: i18n.rowsGenerated,
			className: styles.numRowsGenerated,
			field: 'numRowsGenerated',
			sortable: true
		},
		{ label: i18n.open, className: styles.open },
		{ label: '', className: styles.del }
	];

	return (
		<>
			<section className={`${className} ${styles.page}`}>
				<div className={styles.table}>
					<TableHeader
						cols={cols}
						sortDir={sortDir}
						sortCol={sortCol}
						onSort={(col: string, dir: ColSortDir): void => {
							setSortCol(col);
							setSortDir(dir);
						}}
					/>
					<div className={styles.body}>
						{results.map((dataSet: DataSetListItem) => (
							<Row
								key={dataSet.dataSetId}
								dataSet={dataSet}
								onDelete={(): void => onShowDeleteDialog(dataSet)}
								onLoad={(): void => loadDataSet(dataSet)}
								i18n={i18n}
							/>
						))}
					</div>
				</div>
				{paginationRow}
			</section>

			<DeleteDataSetDialog
				visible={dialogVisible}
				dataSetName={selectedDataSet ? selectedDataSet.dataSetName : null}
				onClose={(): void => setDeleteDialogVisibility(false)}
				onDelete={(): any =>
					deleteDataSet({
						variables: {
							dataSetId: selectedDataSet!.dataSetId
						}
					})
				}
				i18n={i18n}
			/>
		</>
	);
};

export default DataSets;
