import React, { useState } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styles from './Grid.scss';
import Dropdown from '../dropdown/Dropdown';
import { getSortedGroupedDataTypes, getDataTypeComponentsWithFallback } from '../../utils/dataTypeUtils';


const Grid = ({ rows, onRemove, onAddRows, onChangeDataType, i18n, dataTypeI18n }) => {
	const [numRows, setNumRows] = useState(1);
	// const [visible, showHelpDialog] = useState(false);

	// TODO memoize
	const dataTypes = getSortedGroupedDataTypes();

	const getRows = (rows) => {
		return rows.map((row, index) => {
			const { Example, Options } = getDataTypeComponentsWithFallback(row.dataType);

			return (
				<div className={styles.gridRow} key={row.id}>
					<div className={styles.orderCol}>{index + 1}</div>
					<div className={styles.titleCol}>
						<input type="text" />
					</div>
					<div className={styles.dataTypeCol}>
						<Dropdown
							isGrouped={true}
							value={row.dataType}
							onChange={(i) => onChangeDataType(row.id, i.value)}
							options={dataTypes}
						/>
					</div>
					<div className={styles.examplesCol}>
						<Example
							coreI18n={i18n}
							i18n={dataTypeI18n[row.dataType]}
							id={row.id}
							data={row.data}
						/>
					</div>
					<div className={styles.optionsCol}>
						<Options
							coreI18n={i18n}
							i18n={dataTypeI18n[row.dataType]}
							id={row.id}
							data={row.data}
						/>
					</div>
					<div className={styles.helpCol}>

					</div>
					<div className={styles.deleteCol} onClick={() => onRemove(row.id)}>
						<HighlightOffIcon />
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<div className={styles.grid}>
				{getRows(rows)}
			</div>
			<div className={styles.addRows}>
				<form onSubmit={(e) => e.preventDefault()}>
					<span>{i18n.add}</span>
					<input type="number" value={numRows} onChange={(e) => setNumRows(parseInt(e.target.value, 10))}
						min={1} max={1000} step={1} />
					<button onClick={() => onAddRows(numRows)}>{i18n.row_sp}</button>
				</form>
			</div>
		</div>
	);
};

export default Grid;
