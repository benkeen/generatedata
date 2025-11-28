import { TextField } from '@generatedata/core';
import { useClasses } from './AccountsList.styles';

export type SearchFilterProps = {
  value: string;
  onChange: (val: string) => void;
};

const SearchFilter = ({ value, onChange }: SearchFilterProps) => {
  const classNames = useClasses();

  return (
    <div className={classNames.searchFilter}>
      <TextField placeholder="Filter accounts" value={value} onChange={(e: any): void => onChange(e.target.value)} />
    </div>
  );
};

export default SearchFilter;
