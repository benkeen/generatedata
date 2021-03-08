import React from 'react';
import MuiPagination from '@material-ui/lab/Pagination';

const Pagination = ({ numPages, currentPage, onChange }: any): JSX.Element => (
	<MuiPagination
		count={numPages}
		page={currentPage}
		onChange={onChange}
	/>
);

export default Pagination;
