import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { isOnloadAuthDetermined, isLoggedIn } from '~store/main/main.selectors';
import { DefaultSpinner, Centered } from '~components/loaders/loaders';

// simple HOC to require authentication before rendering a component. If the onload auth isn't determined yet it shows a
// loading spinner; if the auth is determined and they're not logged in it redirects to the homepage
export const withAuth = (Component: any) => ({ props }: any): JSX.Element | null => {
	const authDetermined = useSelector(isOnloadAuthDetermined);
	const loggedIn = useSelector(isLoggedIn);
	const history = useHistory();

	useEffect(() => {
		if (authDetermined && !loggedIn) {
			history.push('/');
		}
	}, [loggedIn, authDetermined]);

	if (!authDetermined) {
		return (
			<Centered>
				<DefaultSpinner />
			</Centered>
		);
	}

	if (!loggedIn) {
		return null;
	}

	return (
		<Component {...props} />
	);
};
