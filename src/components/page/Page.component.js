import React from 'react';
import Header from '../header/Header.component';
import Tabs from '../tabs/Tabs.component';
import styles from './Page.scss';


const Page = ({ children }) => (
	<div className={styles.page}>
		<Header />
		<Tabs />
		<div className={styles.content}>
			{children}
		</div>
	</div>
);

export default Page;
