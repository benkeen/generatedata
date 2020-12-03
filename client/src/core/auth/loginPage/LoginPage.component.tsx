import React from 'react';

export type LoginPageProps = {
	i18n: any;
};

const LoginPage = ({ i18n }: LoginPageProps): JSX.Element => {
	return (
		<div>
			{i18n.login}
		</div>
	);
};

export default LoginPage;
