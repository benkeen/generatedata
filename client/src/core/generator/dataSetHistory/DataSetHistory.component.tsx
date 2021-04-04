import React, { useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { useQuery } from '@apollo/client';
import Drawer from '@material-ui/core/Drawer';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DefaultSpinner, Centered } from '~components/loaders/loaders';
import { PrimaryButton, SecondaryButton } from '~components/Buttons.component';
import { Tooltip } from '~components/tooltips';
import * as queries from '~core/queries';
import * as styles from './DataSetHistory.scss';
import C from '~core/constants';

export type DataSetHistoryProps = {
	showPanel: boolean;
	dataSetId: number | null;
	dataSetName: string;
	selectedDataSetHistoryItem: {
		historyId: number | null;
		isLatest: boolean;
	};
	setSelectedDataHistoryItem: (historyId: number, isLatest: boolean) => void;
	closePanel: () => void;
	loadHistoryVersion: (content: any) => void;
	loadStashedVersion: () => void;
	i18n: any;
};

const NUM_PER_PAGE = 200;
const currentPage = 1;


const Row = ({ historyId, rowLabel, dateCreated, onDelete, content, loadHistoryVersion, isSelected, i18n, Btn }: any): React.ReactElement => {
	let classes = styles.row;
	if (isSelected) {
		classes += ` ${styles.selectedRow}`;
	}

	return (
		<div className={classes}>
			{rowLabel && <label>{rowLabel}</label>}
			<div className={styles.rowWrapper}>
				<div className={styles.dateCreated}>
					{format(fromUnixTime(dateCreated / 1000), C.DATETIME_FORMAT)}
				</div>
				<div className={styles.edit}>
					<Btn
						size="small"
						disabled={isSelected}
						onClick={(): void => loadHistoryVersion(content)}>
						{i18n.view}
					</Btn>
				</div>
				<div className={styles.del} onClick={onDelete}>
					<HighlightOffIcon />
				</div>
			</div>
		</div>
	);
};

export const DataSetHistory = ({
	showPanel, dataSetId, dataSetName, closePanel, loadHistoryVersion, loadStashedVersion, selectedDataSetHistoryItem,
	setSelectedDataHistoryItem, i18n
}: DataSetHistoryProps): React.ReactElement | null => {
	const { historyId } = selectedDataSetHistoryItem;

	const { data, loading } = useQuery(queries.GET_DATA_SET_HISTORY, {
		fetchPolicy: 'cache-and-network',
		variables: {
			dataSetId,
			offset: (currentPage - 1) * NUM_PER_PAGE,
			limit: NUM_PER_PAGE
		},
		skip: !dataSetId
	});

	if (!dataSetId) {
		return null;
	}

	const loadVersion = (version: any, isLatest: boolean): void => {
		const { historyId, content } = version;
		setSelectedDataHistoryItem(historyId, isLatest);
		loadHistoryVersion(content);
	};

	let content = null;

	if (data?.dataSetHistory) {
		if (data.dataSetHistory.totalCount === 0) {
			content = <p>{i18n.noHistory}</p>;
		} else {
			const latestRow = data.dataSetHistory.results[0];

			content = (
				<>
					<div className={styles.currentVersionRow}>
						<Row
							{...latestRow}
							rowLabel={i18n.currentVersion}
							key={latestRow.historyId}
							loadHistoryVersion={loadStashedVersion}
							isSelected={historyId === null}
							i18n={i18n}
							Btn={SecondaryButton}
						/>
					</div>
					<div className={styles.rows}>
						{data.dataSetHistory.results.map((row: any) => (
							<Row
								{...row}
								className={styles.row}
								key={row.historyId}
								loadHistoryVersion={() => loadVersion(row, false)}
								isSelected={row.historyId === historyId}
								i18n={i18n}
								Btn={PrimaryButton}
							/>
						))}
					</div>
				</>
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
					<span>{dataSetName}</span>
					<Tooltip title={i18n.historyPanelDesc} arrow>
						<InfoIcon />
					</Tooltip>
				</h2>
				<section>
					{loader}
					{content}
				</section>
				<footer>
					<PrimaryButton onClick={closePanel}>
						<HighlightOffIcon />
						{i18n.closePanel}
					</PrimaryButton>
				</footer>
			</div>
		</Drawer>
	);
};
