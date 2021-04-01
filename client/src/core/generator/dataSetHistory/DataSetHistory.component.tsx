import React, { useEffect, useState } from 'react';
import { format, fromUnixTime } from 'date-fns';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import HistoryIcon from '@material-ui/icons/History';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useQuery } from '@apollo/client';
import * as queries from '~core/queries';
import * as styles from './DataSetHistory.scss';
import { Tooltip } from '~components/tooltips';
import { DefaultSpinner, Centered } from '~components/loaders/loaders';
import C from '~core/constants';

export type DataSetHistoryProps = {
	showPanel: boolean;
	dataSetId: number | null;
	dataSetName: string;
	closePanel: () => void;
	loadHistoryVersion: (content: any) => void;
	i18n: any;
};

const NUM_PER_PAGE = 200;
const currentPage = 1;

const Row = ({ historyId, dateCreated, onDelete, content, loadHistoryVersion, isSelected, i18n }: any): React.ReactElement => {
	let classes = styles.row;
	if (isSelected) {
		classes += ` ${styles.selectedRow}`;
	}

	return (
		<div className={classes}>
			<div className={styles.id}>{historyId}</div>
			<div className={styles.dateCreated}>
				{format(fromUnixTime(dateCreated / 1000), C.DATETIME_FORMAT)}
			</div>
			<div className={styles.edit}>
				<Button
					size="small"
					color="primary"
					variant="outlined"
					onClick={(): void => loadHistoryVersion(content)}>
					{i18n.open}
				</Button>
			</div>
			<div className={styles.del} onClick={onDelete}>
				<HighlightOffIcon />
			</div>
		</div>
	);
};

export const DataSetHistory = ({ showPanel, dataSetId, dataSetName, closePanel, loadHistoryVersion,
	i18n }: DataSetHistoryProps): React.ReactElement | null => {

	const [historyId, setSelectedHistoryId] = useState<number | null>(null);

	if (!dataSetId) {
		return null;
	}

	const { data, loading } = useQuery(queries.GET_DATA_SET_HISTORY, {
		fetchPolicy: 'cache-and-network',
		variables: {
			dataSetId,
			offset: (currentPage - 1) * NUM_PER_PAGE,
			limit: NUM_PER_PAGE
		}
	});

	useEffect(() => {
		if (historyId === null && data?.dataSetHistory.results.length > 1) {
			setSelectedHistoryId(data.dataSetHistory.results[0].historyId);
		}
	}, [data]);

	const loadVersion = ({ historyId, content }: any) => {
		setSelectedHistoryId(historyId);
		loadHistoryVersion(content);
	};

	let content = null;

	if (data?.dataSetHistory) {
		if (data.dataSetHistory.totalCount === 1) {
			content = <p>No history yet!</p>;
		} else {
			content = (
				<div className={styles.rows}>
					{data.dataSetHistory.results.map((row: any) => (
						<Row
							{...row}
							key={row.historyId}
							loadHistoryVersion={() => loadVersion(row)}
							isSelected={row.historyId === historyId}
							i18n={i18n}
						/>
					))}
				</div>
			);
		}
	}

	let loader = null;
	if (loading) {
		loader = (
			<Centered>
				<DefaultSpinner />
			</Centered>
		);
	}

	return (
		<Drawer open={showPanel} anchor="left" onClose={() => {}}>
			<div className={`${styles.panel} tour-dataSetHistoryPanel`}>
				<h2>
					<Tooltip title={i18n.historyPanelDesc} arrow>
						<HistoryIcon />
					</Tooltip>
					{dataSetName}
				</h2>
				<section>
					{loader}
					{content}
				</section>
				<footer>
					<Button onClick={closePanel} variant="outlined" color="primary" disableElevation>
						<HighlightOffIcon />
						{i18n.closePanel}
					</Button>
				</footer>
			</div>
		</Drawer>
	);
};
