import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import * as styles from './Account.scss';
import TextField from '~components/TextField';

export type AccountPageProps = {
	firstName: string;
	lastName: string;
	email: string;
	i18n: any;
	updateAccount: (fieldName: string, value: string) => void;
};

const AccountPage = ({ firstName, lastName, email, updateAccount, i18n }: AccountPageProps): JSX.Element => {
	useEffect(() => {
		// getAccount();
	}, []);

	const update = (fieldName: string, value: string): void => {
		updateAccount(fieldName, value);
	};

	return (
		<section className={styles.page}>
			<nav>
				<ul>
					<li>Data Sets</li>
					<li>Your Account</li>
					<li>Payments</li>
				</ul>
			</nav>
			<div className={styles.tab}>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div style={{ flex: 1, paddingRight: 20 }}>
						<label>{i18n.firstName}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								value={firstName}
								name="firstName"
								onChange={(e: any): void => update('firstName', e.target.value)}
								style={{ width: '100%' }}
								autoFocus
							/>
						</div>

						<label>{i18n.lastName}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								value={lastName}
								name="lastName"
								onChange={(e: any): void => update('lastName', e.target.value)}
								style={{ width: '100%' }}
							/>
						</div>

						<label>{i18n.email}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								value={email}
								name="email"
								onChange={(e: any): void => update('email', e.target.value)}
								style={{ width: '100%' }}
							/>
						</div>
					</div>

					<div style={{ flex: 1, borderLeft: '1px solid #f2f2f2', paddingLeft: 20 }}>
						<label>{i18n.password}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								type="password"
								name="password"
								value={""}
								onChange={(): void => {}}
								style={{ width: 200 }}
							/>
						</div>
					</div>
				</div>

				<Button onClick={() => {}} color="primary" variant="contained" disableElevation>{i18n.save}</Button>
			</div>
		</section>
	);
};

export default AccountPage;










