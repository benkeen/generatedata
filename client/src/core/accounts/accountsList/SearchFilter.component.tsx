import React from 'react';
import TextField from '~components/TextField';
import styles from './AccountsList.scss';

export type SearchFilterProps = {
	value: string;
	onChange: (val: string) => void;
};

const SearchFilter = ({ value, onChange }: SearchFilterProps): JSX.Element => (
	<div className={styles.searchFilter}>
		<TextField
			placeholder="Filter accounts"
			value={value}
			onChange={(e: any): void => onChange(e.target.value)}
		/>
	</div>
);

export default SearchFilter;
