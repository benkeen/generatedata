import React from 'react';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
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
	sortCol?: string;
	sortDir?: ColSortDir;
	onSort?: (col: string, dir: ColSortDir) => void;
};

const TableHeader = ({ cols, sortCol, sortDir, onSort }: TableHeaderProps) => {
	const columns = cols.map((col: TableCol, index: number) => {
		let colClasses = styles.colHeader;
		if (col.className) {
			colClasses += ` ${col.className}`;
		}
		if (col.sortable) {
			colClasses += ` ${styles.sortable}`;
		}

		const colProps: any = {
			className: colClasses
		};

		let sorter: any = null;
		let colSortDir = sortDir === ColSortDir.asc ? ColSortDir.desc : ColSortDir.asc;

		if (col.field === sortCol) {
			if (sortDir === ColSortDir.asc) {
				sorter = <ArrowDropUp />;
				colSortDir = ColSortDir.desc;
			} else {
				sorter = <ArrowDropDown />;
				colSortDir = ColSortDir.asc;
			}
		}

		if (col.sortable) {
			colProps.onClick = (): void => onSort!(col.field!, colSortDir);
		}

		return (
			<div {...colProps} key={index}>
				<span>{col.label || ''}</span>
				{sorter}
			</div>
		);
	});

	return <div className={`${styles.row} ${styles.header}`}>{columns}</div>;
};

export default TableHeader;
