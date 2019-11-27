import React from 'react';
import styles from './Grid.scss';

const Grid = ({ rows }) => {

	const getRows = (rows) => {
		return rows.map((row, index) => (
			<div className={styles.gridRow} key={index}>
				<div className={styles.orderCol}>{index+1}</div>
				<div className={styles.titleCol}>
					<input type="text" />
				</div>
				<div className={styles.dataTypeCol}>
					<select></select>
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
