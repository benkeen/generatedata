import * as React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../header/Header.container';
import Footer from '../footer/Footer.component';
import * as styles from './Page.scss';

// const useStyles = makeStyles((theme) => ({
// 	progress: {
// 		margin: theme.spacing(2),
// 	},
// }));

type PageProps = {
    localeFileLoaded: boolean;
    children: any;
}

const Page = ({ localeFileLoaded, children }: PageProps) => {
	// const classes = useStyles();

	const content = localeFileLoaded ? (
		<>
			<Header />
			<div className={styles.content}>
				{children}
			</div>
			<Footer />
		</>
	) : <CircularProgress />;

	return (
		<div className={styles.page}>
			{content}
		</div>
	);
};

export default Page;
