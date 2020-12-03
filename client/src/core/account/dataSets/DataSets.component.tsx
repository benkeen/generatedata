import React from 'react';
import * as styles from '~core/account/Account.scss';

export type DataSetsProps = {
	i18n: any;
};

const DataSets = ({ i18n }: DataSetsProps): JSX.Element => {
	return (
		<section className={styles.page}>
			<h2>Data sets</h2>
		</section>
	);
};

export default DataSets;
