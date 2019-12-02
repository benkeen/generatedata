import React from 'react';
import Select from 'react-select';
import styles from './Grid.scss';
import { getSortedGroupedDataTypes } from '../../utils/dataTypes';


const Grid = ({ rows, onRemove }) => {

	// memoize. I guess moving the locale into
	const dataTypes = getSortedGroupedDataTypes();

	const getRows = (rows) => {
		console.log(rows);
		return rows.map((row, index) => (
			<div className={styles.gridRow} key={row.id}>
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
					<span onClick={() => onRemove(row.id)}>x</span>
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
