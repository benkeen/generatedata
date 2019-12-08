import React, { useState } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styles from './Grid.scss';
import Dropdown from '../dropdown/Dropdown';
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
					<Dropdown
						options={dataTypes}
					/>
				</div>
				<div className={styles.examplesCol}>
				</div>
				<div className={styles.optionsCol}>
				</div>
				<div className={styles.helpCol}>
				</div>
				<div className={styles.deleteCol} onClick={() => onRemove(row.id)}>
					<HighlightOffIcon />
				</div>
			</div>
		));
	};

	return (
		<div>
			<div className={styles.grid}>
				{getRows(rows)}
			</div>
			<div className={styles.addRows}>
				<form onSubmit={(e) => e.preventDefault()}>
					<span>Add</span>
					<input type="number" value={numRows} onChange={(e) => setNumRows(parseInt(e.target.value, 10))}
						min={1} max={1000} step={1} />
					<button onClick={() => onAddRows(numRows)}>Row(s)</button>
				</form>
			</div>
		</div>
	)
};

export default Grid;
