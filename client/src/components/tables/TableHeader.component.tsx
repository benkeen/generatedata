import React from 'react';
import * as styles from './TableHeader.scss';

export type TableCol = {
	label?: string;
	className?: string;
};

export const enum ColSortDir {
	asc = 'asc',
	desc = 'desc'
}

export type TableHeaderProps = {
	cols: TableCol[];
	sortColumn: string;
	sortDir: ColSortDir;
};

const TableHeader = ({ cols, sortColumn, sortDir }: TableHeaderProps) => {
	const columns = cols.map((col: TableCol, index: number) => (
		<div className={col.className || ''} key={index}>
			{col.label || ''}
		</div>
	));

	return (
		<div className={`${styles.row} ${styles.header}`}>
			{columns}
		</div>
	);
};

export default TableHeader;
