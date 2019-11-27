import React, { Fragment } from 'react';
import styles from './Header.scss';

const Header = ({ isLoggedIn }) => {
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

	return (
		<header className={styles.header}>
			<h1>generatedata.com</h1>

			<nav>
				<ul>
					{navOptions}
				</ul>
				<select defaultValue="en">
					<option value="">Select Language</option>
					<option value="de">Deutsch</option>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="fr">Français</option>
					<option value="nl">Nederlands</option>
					<option value="zh">中文</option>
				</select>
			</nav>
		</header>
	)
};

export default Header;
