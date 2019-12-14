import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../header/Header.component';
import Footer from '../footer/Footer.component';
import styles from './Page.scss';

const useStyles = makeStyles(theme => ({
	progress: {
		margin: theme.spacing(2),
	},
}));

const Page = ({ localeFileLoaded, children }) => {
	const classes = useStyles();

	return (
		<div className={styles.page}>
			<Header />
			<div className={styles.content}>
				{localeFileLoaded ? children : <CircularProgress className={classes.progress} />}
			</div>
			<Footer />
		</div>
	);
};

export default Page;
