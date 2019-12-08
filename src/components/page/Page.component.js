import React from 'react';
import Header from '../header/Header.component';
import Footer from '../footer/Footer.component';
// import Tabs from '../tabs/Tabs.component';
import styles from './Page.scss';


const Page = ({ children }) => (
	<div className={styles.page}>
		<Header />
		<div className={styles.content}>
			{children}
		</div>
		<Footer />
	</div>
);

export default Page;
