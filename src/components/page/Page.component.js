import React from 'react';
import Header from '../header/Header.component';
import Tabs from '../tabs/Tabs.component';
import Paper from '@material-ui/core/Paper';
import styles from './Page.scss';


const Page = ({ children }) => (
	<div className={styles.page}>
		<Header />
		<Paper key="rounded">
			<Tabs />
			<div className={styles.content}>
				{children}
			</div>
		</Paper>
	</div>
);

export default Page;
