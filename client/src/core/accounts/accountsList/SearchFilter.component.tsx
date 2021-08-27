import React from 'react';
import TextField from '~components/TextField';
import { SmallSpinner } from '~components/loaders/loaders';

export type SearchFilterProps = {
	value: string;
	loading: boolean;
	onChange: (val: string) => void;
};

const SearchFilter = ({ value, onChange, loading }: SearchFilterProps): JSX.Element => (
	<div style={{ display: 'flex', marginBottom: 15 }}>
		<TextField
			placeholder="Filter accounts"
			value={value}
			onChange={(e: any): void => onChange(e.target.value)}
		/>
		{loading && <SmallSpinner />}
	</div>
);

export default SearchFilter;
