import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import DragIndicator from '@material-ui/icons/DragIndicator';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useQuery } from '@apollo/client';
import * as queries from '~core/queries';
import * as styles from './DataSetHistory.scss';

export type DataSetHistoryProps = {
	dataSetId: number | null;
	i18n: any;
	closePanel: () => void;
};

const NUM_PER_PAGE = 200;
const currentPage = 1;

export const DataSetHistory = ({ dataSetId, closePanel, i18n }: DataSetHistoryProps): React.ReactElement | null => {
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

	return (
		<Drawer open={dataSetId !== null} anchor="left" onClose={() => {}}>
			<div className={`${styles.panel} tour-dataSetHistoryPanel`}>
				<DragIndicator />
				<h3>{i18n.history}</h3>

				<ArrowLeftIcon />
				<select>

				</select>
				<ArrowRightIcon />

				<HighlightOffIcon onClick={closePanel} />
			</div>
		</Drawer>
	);
};
