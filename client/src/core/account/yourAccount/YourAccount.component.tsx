import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
import Dropdown from '~components/dropdown/Dropdown';
import { canadianProvinceOptions, countryDropdownOptions } from '~utils/countryUtils';
import * as styles from '../Account.scss';
import { AccountEditingData } from '~store/account/account.reducer';

export type YourAccountProps = {
	data: AccountEditingData;
	numGeneratedRows: number;
	updateAccount: (fieldName: string, value: string) => void;
	onSave: () => void;
	i18n: any;
};

const YourAccount = ({ data, numGeneratedRows, updateAccount, onSave, i18n }: YourAccountProps) => {
	const update = (fieldName: string, value: string): void => {
		updateAccount(fieldName, value);
	};

	const getCanadianRegions = () => {
		if (data.country !== 'CA') {
			return null;
		}

		return (
			<>
				<label>Province</label>
				<div style={{ marginBottom: 15 }}>
					<Dropdown
						value={data.region}
						onChange={(item: any): any => update('region', item.value)}
						options={canadianProvinceOptions}
					/>
				</div>
			</>
		);
	};

	const handleSave = () => {
		onSave();
	};

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
				<div style={{ flex: 1, paddingRight: 20 }}>
					<label>{i18n.firstName}</label>
					<div style={{ marginBottom: 15 }}>
						<TextField
							value={data.firstName}
							name="firstName"
							onChange={(e: any): void => update('firstName', e.target.value)}
							style={{ width: '100%' }}
							autoFocus
						/>
					</div>

					<label>{i18n.lastName}</label>
					<div style={{ marginBottom: 15 }}>
						<TextField
							value={data.lastName}
							name="lastName"
							onChange={(e: any): void => update('lastName', e.target.value)}
							style={{ width: '100%' }}
						/>
					</div>

					<label>{i18n.email}</label>
					<div style={{ marginBottom: 15 }}>
						<TextField
							value={data.email}
							name="email"
							onChange={(e: any): void => update('email', e.target.value)}
							style={{ width: '100%' }}
						/>
					</div>

					<label>{i18n.country}</label>
					<div style={{ marginBottom: 15 }}>
						<Dropdown
							value={data.country}
							onChange={(item: any): any => update('country', item.value)}
							options={countryDropdownOptions}
						/>
					</div>

					{getCanadianRegions()}
				</div>

				<div style={{ flex: 1, borderLeft: '1px solid #f2f2f2', paddingLeft: 20 }}>
					<label>Total num generated rows</label>
					<div className={styles.numGeneratedRows} style={{ marginBottom: 15 }}>
						{numGeneratedRows}
					</div>
				</div>
			</div>

			<Button onClick={handleSave} color="primary" variant="contained" disableElevation>{i18n.save}</Button>
		</>
	);
};

export default YourAccount;

