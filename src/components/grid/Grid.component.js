import React, { useState } from 'react';
import Select from 'react-select';
import styles from './Grid.scss';
import { getSortedGroupedDataTypes } from '../../utils/dataTypes';


const Grid = ({ rows, onRemove, onAddRows }) => {
	const [numRows, setNumRows] = useState(1);

	// memoize
	const dataTypes = getSortedGroupedDataTypes();

	const getRows = (rows) => {
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
			<div>
				Add
				<input type="number" value={numRows} onChange={(e) => setNumRows(parseInt(e.target.value, 10))}
					min={1} max={1000} step={1} />
				<button onClick={() => onAddRows(numRows)}>Row(s)</button>
			</div>
		</div>
	)
};

export default Grid;
