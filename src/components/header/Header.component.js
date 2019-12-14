import React, { Fragment } from 'react';
import Dropdown from '../dropdown/Dropdown';
import styles from './Header.scss';

const Header = ({ isLoggedIn, onChangeLocale, locale }) => {
	let navOptions;
	if (isLoggedIn) {
		navOptions = (
			<Fragment>
				<li id="gdUserAccount"><a href="#">Your Account</a> |</li>
				<li id="gdLogout"><a href="#">Logout</a> |</li>
			</Fragment>
		);
	} else {
		navOptions = <li id="gdLogin"><a href="#">Login</a> |</li>;
	}

	const options = [
		{ value: "", label: 'Select language' },
		{ value: "de", label: 'Deutsch' },
		{ value: "en", label: 'English' },
		{ value: "es", label: 'Español' },
		{ value: "fr", label: 'Français' },
		{ value: "nl", label: 'Nederlands' },
		{ value: "zh", label: '中文' }
	];
	const selected = options.find((row) => row.value === locale);

	return (
		<header className={styles.header}>
			<div>
				<h1>generatedata.com</h1>

				<nav>
					<ul>
						{navOptions}
					</ul>
					<Dropdown
						className={styles.selectLocale}
						onChange={(item) => onChangeLocale(item.value)}
						value={selected}
						options={options}
					/>
				</nav>
			</div>
		</header>
	)
};

export default Header;
