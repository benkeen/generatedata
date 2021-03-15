import React from 'react';
import ManageAccount from '~components/accounts/manageAccount/ManageAccount.component';
import { AccountEditingData } from '~store/account/account.reducer';
import styles from '../Account.scss';

export type YourAccountProps = {
	data: AccountEditingData;
	numGeneratedRows: number;
	accountHasChanges: boolean;
	updateAccount: (data: AccountEditingData) => void;
	onSave: () => void;
	onCancel: () => void;
	className: string;
	i18n: any;
};

const YourAccount = ({
	data, numGeneratedRows, accountHasChanges, updateAccount, onSave, onCancel, className, i18n
}: YourAccountProps): JSX.Element => {
	// TODO hack CSS
	return (
		<div className={`${className} ${styles.yourAccountPage}`}>
			<ManageAccount
				accountHasChanges={accountHasChanges}
				data={data}
				onSave={onSave}
				onCancel={onCancel}
				updateAccount={updateAccount}
				i18n={i18n}
				submitButtonLabel={i18n.save}
				showRequiredFieldError={true}
			/>
			<div style={{ flex: 1, marginLeft: 20 }}>
				<div style={{ borderLeft: '1px solid #f2f2f2', paddingLeft: 20, height: '83%' }}>
					<label>{i18n.totalNumGeneratedRows}</label>
					<div className={styles.numGeneratedRows} style={{ marginBottom: 15 }}>
						{numGeneratedRows}
					</div>
				</div>
			</div>
		</div>
	);
};

export default YourAccount;
























