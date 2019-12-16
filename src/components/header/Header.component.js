import React, { Fragment } from 'react';
import Dropdown from '../dropdown/Dropdown';
import styles from './Header.scss';

const Header = ({ isLoggedIn, onChangeLocale, locale, i18n }) => {
	let navOptions;

	if (isLoggedIn) {
		navOptions = (
			<Fragment>
				<li id="gdUserAccount"><a href="#">{i18n.your_account}</a> |</li>
				<li id="gdLogout"><a href="#">{i18n.logout}</a> |</li>
			</Fragment>
		);
	} else {
		navOptions = <li id="gdLogin"><a href="#">{i18n.login}</a> |</li>;
	}

	const options = [
		{ value: 'de', label: 'Deutsch' },
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Español' },
		{ value: 'fr', label: 'Français' },
		{ value: 'nl', label: 'Nederlands' },
		{ value: 'zh', label: '中文' }
	];

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
						value={locale}
						options={options}
					/>
				</nav>
			</div>
		</header>
	);
};

export default Header;
