import React from 'react';
import { TextField } from '@generatedata/core';
import styles from './AccountsList.styles.ts';

export type SearchFilterProps = {
  value: string;
  onChange: (val: string) => void;
};

const SearchFilter = ({ value, onChange }: SearchFilterProps) => (
  <div className={styles.searchFilter}>
    <TextField placeholder="Filter accounts" value={value} onChange={(e: any): void => onChange(e.target.value)} />
  </div>
);

export default SearchFilter;
