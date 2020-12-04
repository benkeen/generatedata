import React, { useEffect } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import * as accountStyles from '../Account.scss';
import * as styles from './DataSets.scss';

export type DataSetsProps = {
	i18n: any;
	onInit: () => void;
	dataSets: any;
};

const Row = ({ dataSetName, dateCreated, numRowsGenerated }: any): JSX.Element => {
	console.log(dateCreated, numRowsGenerated);

	return (
		<div className={styles.row}>
			<div className={styles.dataSetName}>{dataSetName}</div>
			<div className={styles.dateCreated}>{dateCreated}</div>
			<div className={styles.lastModified}></div>
			<div className={styles.numRowsGenerated}>{numRowsGenerated}</div>
			<div className={styles.status}></div>
			<div className={styles.del}>
				<HighlightOffIcon />
			</div>
		</div>
	);
};


const DataSets = ({ onInit, dataSets }: DataSetsProps): JSX.Element | null => {
	useEffect(() => {
		onInit();
	}, []);

	if (!dataSets || !dataSets.length) {
		return null;
	}

	return (
		<section className={`${accountStyles.page} ${styles.page}`}>
			<div style={{ width: '100%' }}>
				<div className={`${styles.row} ${styles.header}`}>
					<div className={styles.dataSetName}>Data set name</div>
					<div className={styles.dateCreated}>Date created</div>
					<div className={styles.lastModified}>Last modified</div>
					<div className={styles.numRowsGenerated}>Rows generated</div>
					<div className={styles.status}>Public</div>
					<div className={styles.del} />
				</div>
				<div className={styles.body}>
					{dataSets.map(Row)}
				</div>
			</div>
		</section>
	);
};

export default DataSets;
