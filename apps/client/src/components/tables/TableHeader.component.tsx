import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { useClasses } from './TableHeader.styles';

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
  const classNames = useClasses();

  const columns = cols.map((col: TableCol, index: number) => {
    let colClasses = classNames.colHeader;
    if (col.className) {
      colClasses += ` ${col.className}`;
    }
    if (col.sortable) {
      colClasses += ` ${classNames.sortable}`;
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

  return <div className={`${classNames.row} ${classNames.header}`}>{columns}</div>;
};

export default TableHeader;
