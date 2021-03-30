import * as React from 'react';
import { format, fromUnixTime, add } from 'date-fns';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
// import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useQuery } from '@apollo/client';
import * as queries from '~core/queries';
import * as styles from './DataSetHistory.scss';
import C from '~core/constants';

export type DataSetHistoryProps = {
	showPanel: boolean;
	dataSetId: number | null;
	closePanel: () => void;
	loadHistoryVersion: (content: any) => void;
	i18n: any;
};

const NUM_PER_PAGE = 200;
const currentPage = 1;

const Row = ({ historyId, dateCreated, onDelete, content, loadHistoryVersion, i18n }: any) => (
	<div className={styles.row}>
		<div className={styles.id}>{historyId}</div>
		<div className={styles.dateCreated}>{format(fromUnixTime(dateCreated/1000), C.DATETIME_FORMAT)}</div>
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

export const DataSetHistory = ({ showPanel, dataSetId, closePanel, loadHistoryVersion, i18n }: DataSetHistoryProps): React.ReactElement | null => {
	if (!dataSetId) {
		return null;
	}

	const { data } = useQuery(queries.GET_DATA_SET_HISTORY, {
		fetchPolicy: 'cache-and-network',
		variables: {
			dataSetId,
			offset: (currentPage - 1) * NUM_PER_PAGE,
			limit: NUM_PER_PAGE
		}
	});

	let content = null;

	if (data?.dataSetHistory) {
		if (data.dataSetHistory.totalCount === 1) {
			content = <p>No history.</p>;
		} else {
			content = (
				<div>
					{data.dataSetHistory.results.map((row: any) => (
						<Row
							{...row}
							key={row.historyId}
							loadHistoryVersion={loadHistoryVersion}
							i18n={i18n}
						/>
					))}
				</div>
			);
		}
	}

	return (
		<Drawer open={showPanel} anchor="left" onClose={() => {}}>
			<div className={`${styles.panel} tour-dataSetHistoryPanel`}>
				<h2>{i18n.history}</h2>
				<section>
					{content}
				</section>
				<footer>
					<Button onClick={closePanel} variant="outlined" color="primary" disableElevation>
						{i18n.closePanel}
					</Button>
				</footer>
			</div>
		</Drawer>
	);
};
