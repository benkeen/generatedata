import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../header/Header.container';
import Footer from '../footer/Footer.container';
import * as styles from './Page.scss';

export type PageProps = {
	localeFileLoaded: boolean;
	children: any;
}

const Page = ({ localeFileLoaded, children }: PageProps): JSX.Element => {
	const content = localeFileLoaded ? (
		<>
			<Header />
			<div className={styles.content}>
				{children}
			</div>
			<Footer />
		</>
	) : (
		<div style={{ display: 'flex', height: 40, justifyContent: 'center', margin: 'auto' }}>
			<CircularProgress />
		</div>
	);

	return (
		<div className={styles.page}>
			{content}
		</div>
	);
};

export default Page;
