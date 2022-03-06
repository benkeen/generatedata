import React, { useState } from 'react';
import { format, fromUnixTime, add } from 'date-fns';
import MainFields from '~components/accounts/mainFields/MainFields.component';
import RadioPill, { RadioPillRow } from '~components/pills/RadioPill';
import { LocalizedDatePicker, LocalizedDatePickerProvider } from '~components/datePicker/LocalizedDatePicker.component';
import { getFormattedNum } from '~utils/numberUtils';
import * as dateStyles from '../../../plugins/dataTypes/Date/Date.scss';
import C from '../../../core/constants';
import styles from './ManageAccount.scss';

export type ManageAccountProps = {
	i18n: any;
	onSave: (state: ManageAccountState) => void;
	initialState: ManageAccountState;
	submitButtonLabel: string;
	onCancel?: () => void;
}

export enum ExpiryOption {
	none = 'none',
	date = 'date'
}

export type ManageAccountState = {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	region: string;
	disabled: boolean;
	expiry: ExpiryOption;
	expiryDate: null | number;
	numRowsGenerated: number;
	isAddingUser: boolean;
}

const yearFromNow = Number(format(add(new Date(), { years: 1 }), 't'));

const ManageAccount = ({ i18n, onCancel, onSave, initialState, submitButtonLabel }: ManageAccountProps): JSX.Element => {
	const [data, setData] = useState(initialState);
	const [showDatepicker, setShowDatepicker] = useState(false);
	const [showErrors] = useState(false);

	let accountHasChanges = data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.country !== '';
	if (data.country === 'CA' && data.region === '') {
		accountHasChanges = false;
	}

	const onClickCancel = (): void => {
		setData(initialState);
		if (onCancel) {
			onCancel();
		}
	};

	const updateAccountData = (newData: any): void => {
		setData({
			...data,
			...newData
		});
	};

	const toggleAccountDisabled = (disabled: boolean): void => {
		setData({
			...data,
			disabled
		});
	};

	const toggleExpiry = (expiry: ExpiryOption): void => {
		setData({
			...data,
			expiry
		});

		if (expiry === ExpiryOption.date) {
			setShowDatepicker(true);
		}
	};

	const onSelectDate = (expiryDate: any): void => {
		setData({
			...data,
			expiryDate
		});
	};

	const accountData = {
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		country: data.country,
		region: data.region,
		numRowsGenerated: data.numRowsGenerated
	};

	let expiryLabel = i18n.selectExpiryDate;

	if (data.expiryDate) {
		expiryLabel = format(fromUnixTime(Math.round(data.expiryDate / 1000)), C.DATE_FORMAT);
	}

	return (
		<div className={styles.root}>
			<div style={{ flex: 1 }}>
				<MainFields
					i18n={i18n}
					data={accountData}
					updateAccount={updateAccountData}
					accountHasChanges={accountHasChanges}
					submitButtonLabel={submitButtonLabel}
					showRequiredFieldError={showErrors}
					onCancel={onClickCancel}
					onSave={(): void => onSave(data)}
					isAddingUser={data.isAddingUser}
				/>
			</div>
			<div className={styles.rightCol}>
				<div>
					<div className={styles.disabledFieldRow}>
						<input
							type="checkbox"
							checked={data.disabled}
							id="accountDisabled"
							onChange={(e): void => toggleAccountDisabled(e.target.checked)}
						/>
						<label htmlFor="accountDisabled">{i18n.accountDisabled}</label>
					</div>
				</div>
				<div>
					<div style={{ marginBottom: 15, marginTop: 2 }}>
						<RadioPillRow>
							<RadioPill
								label={i18n.noExpiry}
								onClick={(): void => toggleExpiry(ExpiryOption.none)}
								name="expiry"
								checked={data.expiry === 'none'}
								style={{ marginRight: 6 }}
							/>
							<RadioPill
								label={expiryLabel}
								onClick={(): void => toggleExpiry(ExpiryOption.date)}
								name="expiry"
								checked={data.expiry === 'date'}
							/>
						</RadioPillRow>
					</div>
				</div>
				<div className={styles.rightBlock}>
					<label>{i18n.totalNumGeneratedRows}</label>
					<div>
						{getFormattedNum(initialState.numRowsGenerated)}
					</div>
				</div>
			</div>

			<div style={{ display: 'none' }}>
				<LocalizedDatePickerProvider>
					<LocalizedDatePicker
						autoOk
						open={showDatepicker}
						className={dateStyles.dateField}
						value={data.expiryDate === null ? fromUnixTime(yearFromNow) : fromUnixTime(data.expiryDate / 1000)}
						onChange={(val: any): void => onSelectDate(format(val, 'T'))}
						onClose={(): void => setShowDatepicker(false)}
					/>
				</LocalizedDatePickerProvider>
			</div>
		</div>
	);
};

export default ManageAccount;
