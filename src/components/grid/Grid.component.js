import React from 'react';
import Select from 'react-select';
import styles from './Grid.scss';
import { getSortedGroupedDataTypes } from '../../utils/dataTypes';

const dataTypes = getSortedGroupedDataTypes();

const Grid = ({ rows }) => {

	const getRows = (rows) => {
		return rows.map((row, index) => (
			<div className={styles.gridRow} key={index}>
				<div className={styles.orderCol}>{index+1}</div>
				<div className={styles.titleCol}>
					<input type="text" />
				</div>
				<div className={styles.dataTypeCol}>
					<Select options={dataTypes} />
				</div>
				<div className={styles.examplesCol}>
				</div>
				<div className={styles.optionsCol}>
				</div>
				<div className={styles.helpCol}>
				</div>
				<div className={styles.deleteCol}>
					x
				</div>
			</div>
		));
	};

	return (
		<div>
			{getRows(rows)}
		</div>
	)
};

export default Grid;
