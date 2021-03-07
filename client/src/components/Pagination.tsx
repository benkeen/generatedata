import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MuiPagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			'& > *': {
				marginTop: theme.spacing(0),
				marginRight: 0,
				marginLeft: 0
			},
		},
	}),
);

const Pagination = ({ numPages, currentPage, onChange }: any) => {
	// const classes = useStyles();
	return (
		<MuiPagination
			count={numPages}
			page={currentPage}
			onChange={onChange}
		/>
	);
};

export default Pagination;

