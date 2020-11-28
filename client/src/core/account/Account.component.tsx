import React, { useEffect } from 'react';
import * as styles from './Account.scss';

export type AccountPageProps = {
	i18n: any;
	getAccount: () => void;
};

const AccountPage = ({ getAccount }: AccountPageProps): JSX.Element => {
	useEffect(() => {
		getAccount();
	}, []);

	return (
		<section className={styles.page}>
			<div>
				<nav>
					<ul>
						<li>Data Sets</li>
						<li>Your profile</li>
						<li>Payments</li>
					</ul>
				</nav>
			</div>
			<div>

			</div>
		</section>
	);
};

export default AccountPage;
