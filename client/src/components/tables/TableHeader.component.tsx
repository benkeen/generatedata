import React from 'react';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import * as styles from './TableHeader.scss';

export type TableCol = {
	label?: string;
	field?: string;
	className?: string;
	sortable?: boolean;
};

export const enum ColSortDir {
	asc = 'ASC',
	desc = 'DESC'
}

export type TableHeaderProps = {
	cols: TableCol[];
	sortCol: string;
	sortDir: ColSortDir;
};

const TableHeader = ({ cols, sortCol, sortDir }: TableHeaderProps): JSX.Element => {
	const columns = cols.map((col: TableCol, index: number) => {
		let sorter: any;
		if (col.field === sortCol) {
			if (sortDir === ColSortDir.asc) {
				sorter = <ArrowDropUp />;
			} else {
				sorter = <ArrowDropDown />;
			}
		}

		let colClasses = styles.colHeader;
		if (col.className) {
			colClasses += ` ${col.className}`;
		}
		if (col.sortable) {
			colClasses += ` ${styles.sortable}`;
		}

		return (
			<div className={colClasses} key={index}>
				<span>{col.label || ''}</span>
				{sorter}
			</div>
		);
	});

	return (
		<div className={`${styles.row} ${styles.header}`}>
			{columns}
		</div>
	);
};

export default TableHeader;
