import React, { useEffect } from 'react';
import MainFields from '~components/accounts/mainFields/MainFields.component';
import { AccountEditingData } from '~store/account/account.reducer';
import { getFormattedNum } from '~utils/numberUtils';
import { formatUnixTime } from '~utils/dateUtils';
import styles from '../Account.scss';
import C from '../../constants';

export type YourAccountProps = {
	data: AccountEditingData;
	numGeneratedRows: number;
	accountHasChanges: boolean;
	updateAccount: (data: AccountEditingData) => void;
	expiryDate: string;
	onInit: () => void;
	onSave: () => void;
	onCancel: () => void;
	className: string;
	i18n: any;
};

const YourAccount = ({
	data, numGeneratedRows, accountHasChanges, updateAccount, onSave, onCancel, className, i18n, onInit,
	expiryDate
}: YourAccountProps): JSX.Element => {

	useEffect(() => {
		onInit();
	}, []);

	const getExpiryDate = (): JSX.Element | null => {
		if (!expiryDate) {
			return null;
		}

		return (
			<div className={styles.rightBlock}>
				<label>{i18n.accountExpiryDate}</label>
				<div>
					{formatUnixTime(parseInt(expiryDate)/1000, C.DATE_FORMAT)}
				</div>
			</div>
		);
	};

	return (
		<div className={`${className} ${styles.yourAccountPage}`}>
			<MainFields
				accountHasChanges={accountHasChanges}
				data={data}
				onSave={onSave}
				onCancel={onCancel}
				updateAccount={updateAccount}
				i18n={i18n}
				submitButtonLabel={i18n.save}
				showRequiredFieldError={true}
			/>
			<div className={styles.yourAccountRightCol}>
				<div className={styles.rightCol}>
					<div className={styles.rightBlock}>
						<label>{i18n.totalNumGeneratedRows}</label>
						<div>
							{getFormattedNum(numGeneratedRows)}
						</div>
					</div>
					{getExpiryDate()}
				</div>
			</div>
		</div>
	);
};

export default YourAccount;
























