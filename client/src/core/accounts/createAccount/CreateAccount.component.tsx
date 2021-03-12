import React, { useState } from 'react';
import ManageAccount from '~components/accounts/manageAccount/ManageAccount.component';

export type CreateAccountProps = {
	i18n: any;
	onSave: () => void;
}

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	country: '',
	region: ''
};

const CreateAccount = ({ i18n, onSave }: any): JSX.Element => {
	const [data, setData] = useState(initialState);
	const [showErrors, setShowErrors] = useState(false);

	let accountHasChanges = data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.country !== '';
	if (data.country === 'CA' && data.region === '') {
		accountHasChanges = false;
	}

	const onCancel = (): void => setData(initialState);

	return (
		<ManageAccount
			i18n={i18n}
			data={data}
			updateAccount={setData}
			accountHasChanges={accountHasChanges}
			submitButtonLabel={i18n.createAccount}
			showRequiredFieldError={showErrors}
			onCancel={onCancel}
			onSave={(): void => onSave(data)}
		/>
	);
};

export default CreateAccount;
